$(document).ready(function () {
	var canvas = $("canvas");

	//Get a reference to the canvas' drawing surface
	var context = canvas.get(0).getContext("2d");

	//Variables to hold the new image
	var monsterImage = new Image();

	//Add a listener to the image to call the render function when the image has loaded
	monsterImage.addEventListener("load", loadHandler, false);

	monsterImage.src = "monsterTileSheet.png";

	function loadHandler() {
		//This line below chops up an image from a spritesheet and paste it on a canvas
		context.drawImage(monsterImage, 0, 0, 128, 128, 0, 0, 128, 128); //(image, startCut.x, startCut.y, endCut.x, endCut.y, 
	}																	 //startPaste.x, startPaste.y, endPaste.x, endPaste.y)
});