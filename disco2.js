
// Canvas
const canvas2 = document.querySelector('canvas.webgl2');



// Scene
const scene1 = new THREE.Scene()
scene1.background = new THREE.Color('rgb(16, 16, 16)');


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
        model.scale.set(0.8, 0.8, 0.8)
        scene1.add(model)
    }
    
);




const cubeTextureLoader1 = new THREE.CubeTextureLoader()

const environmentMap1 = cubeTextureLoader1.load([
  './static/textures/environmentMaps/5/nx.png',
  './static/textures/environmentMaps/5/px.png',
  './static/textures/environmentMaps/5/px.png',
  './static/textures/environmentMaps/5/ny.png',
  './static/textures/environmentMaps/5/pz.png',
  './static/textures/environmentMaps/5/nz.png',
])

environmentMap1.encoding = THREE.sRGBEncoding

//scene.background = environmentMap
scene1.environment = environmentMap1





/**
 * Lights
 */
const ambientLight1 = new THREE.AmbientLight(0xffffff, 1)
scene1.add(ambientLight1)

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 10)
directionalLight3.position.set(0, 1.5, 5)
scene1.add(directionalLight3)

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 10)
directionalLight2.position.set(0, 5, -5)
scene1.add(directionalLight2)




/**
 * Sizes
 */
const sizes1 = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener( 'resize', onWindowResize);

	function onWindowResize() {
        
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer1.setSize(width, height);
        camera1.aspect = width / height;
        camera1.updateProjectionMatrix();

        
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
const camera1 = new THREE.PerspectiveCamera(55, sizes1.width / sizes1.height, 0.1, 100)
camera1.position.set(0, -0.7, 1.5)
scene1.add(camera1)

// Controls
const controls1 = new THREE.OrbitControls(camera1, canvas2)
//controls.target.set(0, 0.75, 0)
controls1.enableDamping = true
controls1.enableZoom = false;
controls1.enableRotate = false;
controls1.autoRotate = 4


/**
 * Renderer
 */
const renderer1 = new THREE.WebGLRenderer({
   
    canvas: canvas2,
    antialias: true,
    alpha: true,
    logarithmicDepthBuffer: true
})


renderer1.shadowMap.enabled = true
renderer1.shadowMap.type = THREE.PCFSoftShadowMap
renderer1.setSize(sizes1.width, sizes1.height)
renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


// mouseMove
document.addEventListener('onMouseMove', onDocumentMouseMove)

let mouseX1 = 0;
let mouseY1 = 0;

let targetX1 = 0;
let targetY1 = 0;

const windowX1 = window.innerWidth / 1000;
const windowy1 = window.innerHeight / 1000;



function onDocumentMouseMove(event) {
    mouseX1 = (event.clientX - windowX1)
    mouseY1 = (event.clientY - windowy1)
}


function onDocumentMouseMove ( event ) {

  mouseX1 = ( event.targetX - windowX1 ) * 1;
  mouseY1 = ( event.targetY - windowy1 ) * 1;

}

function onTouchMove( event ) {

  event.preventDefault();

  var touches1 = event.touches1;
  var touch1 = touches1[ 0 ];

  mouseX1 = ( touch1.targetX - windowX1 ) * 1;
  mouseY1 = ( touch1.targetY - windowy1 ) * 1;

}

/**
 * Animate
 */
const clock1 = new THREE.Clock()
let previousTime1 = 0

const tick1 = () =>
{
    const elapsedTime1 = clock1.getDelta()
    const deltaTime = elapsedTime1 - previousTime1
    previousTime1 = elapsedTime1


    // updateModel
    if(model) model.rotation.y +=  (targetX1 - model.rotation.y)


    // Update controls
    controls1.update()
 
    scene1.rotation.y = Math.PI;
    
    // update mouseMove
    targetX1 = mouseX1 * .03
    targetY1 = mouseY1 * .03


    onWindowResize()

    // Render
    renderer1.render(scene1, camera1)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick1)
}

tick1()

