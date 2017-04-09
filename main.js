// (function() {
	var config, config2, gui;
	var canvas, renderer, scene, camera, controls;

	var axes, mergedMesh;

	var raycaster, mouse, plane;

	var net;

	var ball;

	var player1, player2;

	var prevTime = performance.now();
	var jumpDir;

	init();

	window.addEventListener( 'resize', onWindowResize, false );

	addControls();

	initNet();

	initPlayer1();
	initPlayer2();

	render(prevTime);


	var keyboardControls = {
		player1: {
			up: 'up',
			down: 'down',
			left: 'left',
			right: 'right',
			jump: 'space'
		},
		player2: {
			up: 'w',
			down: 's',
			left: 'a',
			right: 's',
			jump: 'ctrl'
		}
	}

	player1.step = -50;
	player2.step = 50;

	var playerCeil = 150;


	var fieldDepth = 500;
	var playerRadius = 50;


	var playerMass = 50;

	bindKeys(player1, keyboardControls.player1);
	bindKeys(player2, keyboardControls.player2);
	
// }());