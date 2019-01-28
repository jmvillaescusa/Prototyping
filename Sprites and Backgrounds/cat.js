var Cat = (function (x,y,width,height) {
	//This is for the sprite's image
	this.sourceX = 0;
	this.sourceY = 0;
	this.sourceWidth = 64;
	this.sourceHeight = 64;

	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.width = width;
	this.height = height;

	this.image = new Image();
	this.source = "tileSheetWithBackground.png";

	this.moveUp = false;
	this.moveDown = false;
	this.moveLeft = false;
	this.moveRight = false;

	this.Update = function () {
		//Up
		if (this.moveUp && !this.moveDown) {
			this.vy = -5;
		}

		//Down
		if (this.moveDown && !this.moveUp) {
			this.vy = 5;
		}

		//Left
		if (this.moveLeft && !this.moveRight) {
			this.vx = -5;
		}

		//Right
		if (this.moveRight && !this.moveLeft) {
			this.vx = 5;
		}

		if (!this.moveUp && !this.moveDown) {
			this.vy = 0;
		}

		if (!this.moveLeft && !this.moveRight) {
			this.vx = 0;
		}

		this.x += this.vx;
		this.y += this.vy;
	}
});