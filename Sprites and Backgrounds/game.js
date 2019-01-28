$(document).ready(function () {
	var canvas = $("canvas");
	var context = canvas.get(0).getContext("2d");

	var cats = [];
	var tigers = [];
	var background = new Background();
	background.image.src = "tileSheetWithBackground.png";

	for (var i = 0; i < 1; i++) {
		cats.push(new Cat(0, 168, 64, 64));
		cats[i].image.src = cats[i].source;
	}

	for (var i = 0; i < 1; i++) {
		tigers.push(new Tiger(300, 336, 64, 64));
		tigers[i].image.src = tigers[i].source;
	}

	var UP = 38;
	var DOWN = 40;
	var RIGHT = 39;
	var LEFT = 37;

	window.addEventListener("keydown", keydownHandler, false);
	window.addEventListener("keyup", keyupHandler, false);

	function keydownHandler (event) {
		switch (event.keyCode) {
			case UP:
				cats[0].moveUp = true;
				break;

			case DOWN:
				cats[0].moveDown = true;
				break;

			case LEFT:
				cats[0].moveLeft = true;
				break;

			case RIGHT:
				cats[0].moveRight = true;
				break;
		}
	}

	function keyupHandler (event) {
		switch (event.keyCode) {
			case UP:
				cats[0].moveUp = false;
				break;

			case DOWN:
				cats[0].moveDown = false;
				break;

			case LEFT:
				cats[0].moveLeft = false;
				break;

			case RIGHT:
				cats[0].moveRight = false;
				break;
		}
	}

	function Update() {
		//Create the animation loop
		requestAnimationFrame(Update, canvas);

		//Make the cat move right
		cats[0].Update();

		//Make tiger move up
		tigers[0].y--;

		//Render the game
		Render();
	}

	function Render() {
		//Clear the context
		context.clearRect(0, 0, canvas.width, canvas.height);

		context.drawImage(background.image, background.sourceX, background.sourceY, background.sourceWidth, background.sourceHeight, background.x, background.y, background.width, background.height);

		for (var i = 0; i < cats.length; i++) {
			context.drawImage(cats[i].image, cats[i].sourceX, cats[i].sourceY, cats[i].sourceWidth, cats[i].sourceHeight, cats[i].x, cats[i].y, cats[i].width, cats[i].height);
		}
		for (var i = 0; i < cats.length; i++) {
			context.drawImage(tigers[i].image, tigers[i].sourceX, tigers[i].sourceY, tigers[i].sourceWidth, tigers[i].sourceHeight, tigers[i].x, tigers[i].y, tigers[i].width, tigers[i].height);
		}
	}

	Update();
});