
// Canvas
const canvas = document.querySelector('canvas.webgl')
//const canvas2 = document.querySelector('canvas.webgl2')


// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('rgb(0, 0, 0)');


// GLTF Loader

var model;

var loader = new THREE.GLTFLoader()
loader.load(
	'./static/models/ball2/scene.gltf',
	function ( gltf ) {
        gltf.scene.traverse( function ( gltf) {
        //gltf.scale.set(1, 1, 1)
        
        });
        
        model = gltf.scene;
        model.position.set(0, -0.2, 0)
        model.scale.set(0.7, 0.7, 0.7)
        scene.add(model)
    }
    
);




const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMap = cubeTextureLoader.load([
  './static/textures/environmentMaps/5/nx.png',
  './static/textures/environmentMaps/5/px.png',
  './static/textures/environmentMaps/5/px.png',
  './static/textures/environmentMaps/5/ny.png',
  './static/textures/environmentMaps/5/pz.png',
  './static/textures/environmentMaps/5/nz.png',
])

environmentMap.encoding = THREE.sRGBEncoding

//scene.background = environmentMap
scene.environment = environmentMap





/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 10)
directionalLight.position.set(0, 1.5, 5)
scene.add(directionalLight)

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 10)
directionalLight1.position.set(0, 5, -5)
scene.add(directionalLight1)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener( 'resize', onWindowResize);

	function onWindowResize() {
        
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        
    var widtha = $(window).width();
    var widthb = $(window).width();

      if (widthb < 700) {
      if (model) model.scale.set(0.66, 0.66, 0.66);
    }
    if (widtha < 530) {
      if (model) model.scale.set(0.33, 0.33, 0.33);
    }


    $(window).resize(function () {
      var widtha = $(window).width();
      var widthb = $(window).width();
      if (widtha < 530) {
        if (model) model.scale.set(0.33, 0.33, 0.33);

      }

      if (widthb < 700) {
        if (model) model.scale.set(0.66, 0.66, 0.66);

      }
    });
    
		}




/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, -0.7, 1.5)
scene.add(camera)

// Controls
const controls = new THREE.OrbitControls(camera, canvas)
//controls.target.set(0, 0.75, 0)
controls.enableDamping = true
controls.enableZoom = false;
controls.enableRotate = false;
controls.autoRotate = 4


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
   
    canvas: canvas,
    antialias: true,
    alpha: true,
    logarithmicDepthBuffer: true
})


renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


// mouseMove
document.addEventListener('onMouseMove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 1000;
const windowy = window.innerHeight / 1000;



function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowy)
}


function onDocumentMouseMove ( event ) {

  mouseX = ( event.targetX - windowX ) * 1;
  mouseY = ( event.targetY - windowy ) * 1;

}

function onTouchMove( event ) {

  event.preventDefault();

  var touches = event.touches;
  var touch = touches[ 0 ];

  mouseX = ( touch.targetX - windowX ) * 1;
  mouseY = ( touch.targetY - windowy ) * 1;

}

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getDelta()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


    // updateModel
    if(model) model.rotation.y +=  (targetX - model.rotation.y)


    // Update controls
    controls.update()
 
    scene.rotation.y = Math.PI;
    
    // update mouseMove
    targetX = mouseX * .03
    targetY = mouseY * .03


    onWindowResize()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

