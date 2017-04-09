function drawBall(x, y) {
	ball.ball.position.set(0, y, x);
}

function firstDrawBall(x, y, radius) {
	var g = new THREE.SphereGeometry(radius, 12, 12);
	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		vertexColors: THREE.FaceColors
	});
	makeColorful(g);
	ball = new THREE.Mesh(g, material);
	ball.position.set(0, y, x);
	scene.add(ball);
}