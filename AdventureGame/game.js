$(document).ready(function () {
	//Create the map
	var map = [];
	map[0] = "An old stone keep.";
	map[1] = "A deep well.";
	map[2] = "A sunny glade.";
	map[3] = "A sleeping dragon.";
	map[4] = "A narrow pathway.";
	map[5] = "An ancient gate.";
	map[6] = "The edge of a river.";
	map[7] = "A lonely wooden bench.";
	map[8] = "An isolated cottage. Faint music comes from inside.";

	//Images
	var images = []; 
	images[0] = "keep.png";
	images[1] = "well.png";
	images[2] = "glade.png";
	images[3] = "dragon.png";
	images[4] = "path.png";
	images[5] = "gate.png";
	images[6] = "river.png";
	images[7] = "bench.png";
	images[8] = "cottage.png";

	//Set the player's start location
	var mapLocation = 4;

	//Initialize the player's input
	var playersInput = "";

	//Initialize the game message
	var gameMessage = "";

	//Create an array of actions the game understands 
	//and variables to store the current action.
	var actionsIKnow = ["north", "south", "east", "west"];
	var action = "";

	var image = $("img");

	//The input and output fields
	var output = $("#output");
	var input = $("#input");

	//button
	var button = $("button");
	button.css("cursor", "pointer");

	button.click(function (e) {
		clickHandler();
	});

	//Display the player's location
	render();

	function clickHandler() {
		playGame();
	}

	function playGame() {
		//Get the player's input and covert it to lowercase
		playersInput = input.val();
		playersInput = playersInput.toLowerCase();

		//Reset these variables from the previous turn
		gameMessage = "";
		action = "";

		//Figure out the player's action
		for (var i = 0; i < actionsIKnow.length; i++) {
			if (playersInput.indexOf(actionsIKnow[i]) !== -1) {
				action = actionsIKnow[i];
				console.log("PLayer's action: " + action);
				break;
			}
		}

		//Choose the correct action
		switch (action) {
			case "north":
				mapLocation -= 3;
				break;

			case "east":
				mapLocation += 1;
				break;

			case "south":
				mapLocation += 3;
				break;

			case "west":
				mapLocation -= 1;
				break;

			default:
				gameMessage = "I don't understand that.";
		}

		//Render the game
		render();
	}

	function render() {
		//Render Location
		output.html(map[mapLocation]);
		image.attr("src", "images/" + images[mapLocation]);
		output.html("<br>");
		output.html("<em>" + gameMessage + "</em>");
	}
});