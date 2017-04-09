function initNet() {
	console.log('net');
	var geometryX = new THREE.BoxGeometry(500 * 2, 100, 0);
	//(500 * 2, 100, 100);
	var sizeX = 500;
	//var y = 100;
	var sizeY = 100;
	var step = 10;
	var geometry = new THREE.Geometry();
	for (var y = 0; y <= sizeY; y += step) {
		for (var x = -sizeX; x <= sizeX; x += step) {

			geometry.vertices.push(new THREE.Vector3(-sizeX, y, 0));
			geometry.vertices.push(new THREE.Vector3(sizeX, y, 0));
			geometry.vertices.push(new THREE.Vector3(x, 0, 0));
			geometry.vertices.push(new THREE.Vector3(x, sizeY, 0));
		}
	}
	var material = new THREE.LineBasicMaterial({
		color: 0x000000,
		opacity: 1,
		transparent: false
	});
	net = new THREE.LineSegments(geometry, material);
	scene.add(net);
	net.position.set(0, 50, 0);

};


function initGrass() {
	// grid
	console.log('grass');
	var size = 500,
		step = 50;
	var geometry = new THREE.Geometry();
	for (var i = -size; i <= size; i += step) {
		geometry.vertices.push(new THREE.Vector3(-size, 0, i));
		geometry.vertices.push(new THREE.Vector3(size, 0, i));
		geometry.vertices.push(new THREE.Vector3(i, 0, -size));
		geometry.vertices.push(new THREE.Vector3(i, 0, size));
	}
	var material = new THREE.LineBasicMaterial({
		color: 0x000000,
		opacity: 1,
		transparent: false
	});
	var line = new THREE.LineSegments(geometry, material);
	scene.add(line);
	var geometry = new THREE.PlaneBufferGeometry(1000, 1000);
	geometry.rotateX(-Math.PI / 2);
	plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
		color: 0X00ff00,
		opacity: 1,
		transparent: false
	}));
	scene.add(plane);
};