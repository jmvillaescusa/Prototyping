var Tiger = (function (x, y, width, height) {
	this.sourceX = 64;
	this.sourceY = 0;
	this.sourceWidth = 64;
	this.sourceHeight = 64;

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.image = new Image();
	this.source = "tileSheetWithBackground.png";
});