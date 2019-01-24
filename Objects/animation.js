$(document).ready(function () {
	var canvas = $("canvas");
	var context = canvas.get(0).getContext("2d");

	var monster = {
		IMAGE: "frames.png",
		SIZE: 128,
		numberOfFrames: 5,
		currentFrame: 0,
		sourceX: 0,
		sourceY: 0,

		updateAnimation: function () {
			this.sourceX = this.currentFrame * this.SIZE;
			this.sourceY = 0;

			if (this.currentFrame < this.numberOfFrames) {
				this.currentFrame++;
				console.log(monster.currentFrame);
			}
		}
	};

	var image = new Image();
	image.addEventListener("load", loadHandler, false);
	image.src = monster.IMAGE;

	function loadHandler() {
		updateAnimation();
	}

	function updateAnimation() {
		setTimeout(updateAnimation, 300);
		monster.updateAnimation();
		render();
	}

	function render() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(image, monster.sourceX, monster.sourceY, monster.SIZE, monster.SIZE, 0, 0, monster.SIZE, monster.SIZE);
	}
});