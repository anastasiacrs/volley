function addHalfSphere() {
	mergedMesh = createHalfSphere(200);
	scene.add(mergedMesh);
}


function addControls() {
	controls = new THREE.TrackballControls(camera);

	//controls.target.set( x, y, z );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 0.2;
	controls.panSpeed = 0.8;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
}


function mergeMeshes(meshes) {
	var combined = new THREE.Geometry();

	for (var i = 0; i < meshes.length; i++) {
		meshes[i].updateMatrix();
		combined.merge(meshes[i].geometry, meshes[i].matrix);
	}

	return combined;
}


function makeColorful(geometry) {
	for (var i = 0; i < geometry.faces.length; i++) {
		geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
	}
}

function createHalfSphere(radius) {
	var halfSphere = new THREE.SphereGeometry(radius, 12, 12, 0, 2 * Math.PI, 0, Math.PI / 2);
	var circle = new THREE.CircleGeometry(radius, 12);

	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		vertexColors: THREE.FaceColors
	});
	//material.side = THREE.DoubleSide;

	makeColorful(halfSphere);
	makeColorful(circle);


	var mesh_halfSphere = new THREE.Mesh(halfSphere, material);
	var mesh_circle = new THREE.Mesh(circle, material);
	mesh_circle.rotation.x = Math.PI / 2;

	var meshes = [];
	meshes.push(mesh_halfSphere);
	meshes.push(mesh_circle);

	var mergedGeometry = mergeMeshes(meshes);
	var mergedMesh = new THREE.Mesh(mergedGeometry, material);

	return mergedMesh;
}

function buildAxes(length) {
	var axes = new THREE.Object3D();

	axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xFF0000, false)); // +X
	axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xFF0000, true)); // -X
	axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00FF00, false)); // +Y
	axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x00FF00, true)); // -Y
	axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000FF, false)); // +Z
	axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x0000FF, true)); // -Z

	return axes;

}

function buildAxis(src, dst, colorHex, dashed) {
	var geom = new THREE.Geometry(),
		mat;

	if (dashed) {
		mat = new THREE.LineDashedMaterial({
			linewidth: 3,
			color: colorHex,
			dashSize: 3,
			gapSize: 3
		});
	} else {
		mat = new THREE.LineBasicMaterial({
			linewidth: 3,
			color: colorHex
		});
	}

	geom.vertices.push(src.clone());
	geom.vertices.push(dst.clone());
	geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

	var axis = new THREE.Line(geom, mat, THREE.LinePieces);

	return axis;

}

function onWindowResize() {
	console.log('resize');
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}