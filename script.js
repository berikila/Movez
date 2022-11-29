
		gsap.to("#text, .outline-text", {
			scrollTrigger:{
				trigger: ".text, .outline-text", 
				start: "center center", 
				end: "bottom top", 
				scrub: 1
			},
			x: 100
		})

		gsap.to("#text2", {
			scrollTrigger:{
				trigger: "#text2",
				start: "bottom bottom", 
				end: "bottom top", 
				scrub: 1,
// 				markers: true
			},
			x: -150,

		})
