function init() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	canvas = document.getElementById('canvas');

	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

	var texture_sky = new THREE.TextureLoader().load('sky.jpg');
	var material_sky = new THREE.MeshBasicMaterial({
		map: texture_sky
	});
	material_sky.side = THREE.BackSide;

	var texture_sand = new THREE.TextureLoader().load('sand.jpg');
	var material_sand = new THREE.MeshBasicMaterial({
		map: texture_sand
	});
	material_sand.side = THREE.BackSide;



	var texture_grass1 = new THREE.TextureLoader().load('grass1.jpg');
	var material_grass1 = new THREE.MeshBasicMaterial({
		map: texture_grass1
	});
	material_grass1.side = THREE.BackSide;

	var texture_grass2 = new THREE.TextureLoader().load('grass2.png');
	var material_grass2 = new THREE.MeshBasicMaterial({
		map: texture_grass2
	});
	material_grass2.side = THREE.BackSide;


	var transparent_material = new THREE.MeshBasicMaterial({
		opacity: 0,
		transparent: true
	});

	//inv_right_wall vis_left ceil? floor? inv_left_wall  vis_right_wall
	var materials = [transparent_material, material_sky, material_sky,
		material_sand, transparent_material, material_sky
	];

	renderer = new THREE.WebGLRenderer({
		canvas: canvas
	});
	renderer.setClearColor(0x000000);

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
	camera.position.set(499, 499, 499); //1000 500 1000
	//camera.position.set(1000, 500, 1000);//1000 500 1000
	camera.lookAt(new THREE.Vector3(0, 0, 0));


	var light = new THREE.AmbientLight(0xffffff);
	scene.add(light);

	axes = buildAxes(1000);
	scene.add(axes);

	// SKYBOX/FOG
	var skyBoxGeometry = new THREE.BoxBufferGeometry(1000, 500, 1000, 100, 100, 100); //CubeGeometry
	var skyBoxMaterial = new THREE.MeshBasicMaterial({
		color: 0x9999ff,
		side: THREE.BackSide,
		wireframe: true
	});
	//var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
	//var skyBox = new THREE.Mesh(skyBoxGeometry, meshFaceMaterial);
	//var skyBox = new THREE.Mesh(skyBoxGeometry, material);
	var skyBox = new THREE.Mesh(skyBoxGeometry, new THREE.MultiMaterial(materials));



	scene.add(skyBox);
	skyBox.position.set(0, 250, 0);
	//scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

//===============================================
//===============================================
//===============================================

	 let v = new Vector(0, 270);
      ball = new Ball(450, 120, 10, v);

}