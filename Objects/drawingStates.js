$(document).ready(function () {
	var canvas = $("canvas");
	var context = canvas.get(0).getContext("2d");

	var monster = {
		image: "monsterStates.png",
		NORMAL: 0,
		SCARED: 1,
		state: 0
	};

	var monsterImage = new Image();
	monsterImage.addEventListener("load", render, false);
	monsterImage.src = monster.image;

	window.addEventListener("keydown", keydownHandler, false);
	//window.addEventListener("keyup", keyupHandler, false);

	function keydownHandler() {
		//monster.state = monster.SCARED;
		//render();
		becomeScared();
	}

	function becomeScared() {
		monster.state = monster.SCARED;
		setTimeout(becomeNormal, 1000);
		render();
	}

	function becomeNormal() {
		monster.state = monster.NORMAL;
		render();
	}

	function keyupHandler() {
		monster.state = monster.NORMAL;
		render();
	}

	function render() {
		switch (monster.state) {
			case monster.NORMAL:
				context.drawImage(monsterImage, 0, 0, 64, 64, 0, 0, 64, 64);
				break;

			case monster.SCARED:
				context.drawImage(monsterImage, 64, 0, 64, 64, 0, 0, 64, 64);
				break;
		}
	}
});