
	function bindKeys(player, keyboardControls) {
		
		keyboardJS.bind(keyboardControls.up, function(e) {
			if (Math.abs(player.position.z) <= playerRadius) {
				return;
			}
			player.position.z -= player.step;
		});

		keyboardJS.bind(keyboardControls.down, function(e) {
			if (Math.abs(player.position.z) >= fieldDepth - playerRadius) {
				return;
			} //(halfField-radius)
			player.position.z += player.step;
		});

		keyboardJS.bind(keyboardControls.jump, function(e) {
			if (player.canJump === true) {
				player.jumpDir = 'up';
				player.canJump = false;
			}

		});
	}


	function initPlayer1() {
		player1 = createHalfSphere(50); //2x2 cells
		scene.add(player1);
		player1.position.set(0, 0, -450); //max (-400 for ball)
		player1.canJump = true;
		player1.radius=50;
	}

	function initPlayer2() {
		player2 = createHalfSphere(50); //2x2 cells
		scene.add(player2);
		player2.position.set(0, 0, 450); //max (400 for ball)
		player2.canJump=true;
		player2.radius=50;
	}



function processJump(player, delta) {
		if (player.canJump == false && player.jumpDir == 'down') { //player1.position.y>0&&
			player.position.y -= 9.8 * playerMass * delta; //  mass
			var isOnFloor = (player.position.y <= 0);
			if (isOnFloor === true) {
				player.position.y = 0;
				player.canJump = true;
			}
		}

		if (player.canJump == false && player.jumpDir == 'up') {
			player.position.y += 9.8 * playerMass * delta; //  mass
			var isUp = (player.position.y >= playerCeil);
			if (isUp === true) {
				player.position.y = 150;
				player.canJump = false;
				player.jumpDir = 'down';
			}
		}
	}