function render() {
		requestAnimationFrame(function() {
			render();
		});

		var time = performance.now();
		var delta = (time - prevTime) / 1000;

		processJump(player1, delta);
		processJump(player2,delta);

		prevTime = time;

		if (controls) {
			controls.update();
		}

//============================================
		if (ball.collides(player2)) {
                   	console.log("!!!!!!!!");
                   	let k = Math.atan((ball.y - player2.position.y) / (player2.position.z - ball.x));
                    let normal = k > 0 ? k - Math.PI / 2 : k + Math.PI / 2;
                      
                       ball.bounce(normal);
                       while (ball.collides(player2)) {
                           ball.move();
                       }
                   }

                    ball.move();
                    ball.draw();
//============================================               

		renderer.render(scene, camera);
	}
