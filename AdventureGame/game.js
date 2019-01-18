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

	//Check game-world boundaries messages
	var blockedPathMessages = [];
	blockedPathMessages[0] = "It's too dangerous to move that way.";
	blockedPathMessages[1] = "A mysterious force holds you back.";
	blockedPathMessages[2] = "A tangle of thorns block your way.";
	blockedPathMessages[3] = "You can't step over the dragon.";
	blockedPathMessages[4] = "";
	blockedPathMessages[5] = "The gate locks shut.";
	blockedPathMessages[6] = "The river is too deep to cross.";
	blockedPathMessages[7] = "The trees are too thick to pass.";
	blockedPathMessages[8] = "You're scared to go that way.";

	//Items
	var items = ["flute", "stone", "sword"];
	var itemLocations = [1, 6, 8];
	var item = "";

	//Set the player's start location
	var mapLocation = 4;

	//Initialize the player's input
	var playersInput = "";

	//Initialize the game message
	var gameMessage = "";

	//Create an array of actions the game understands 
	//and variables to store the current action.
	var actionsIKnow = ["north", "south", "east", "west", "take", "use", "drop"];
	var action = "";

	var backpack = [];

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

		//Figur out the item the player wants
		for (var i = 9; i < items.length; i++) {
			if (playersInput.indexOf(items[i]) !== -1) {
				item = items[i];
				console.log("player's item: " + item);
			}
		}

		//Choose the correct action
		switch (action) {
			case "north":
				if (mapLocation >= 3) {
					mapLocation -= 3;
				}
				else {
					gameMessage = blockedPathMessages[mapLocation];
				}
				break;

			case "east":
				if (mapLocation % 3 != 2) {
					mapLocation += 1;
				}
				else {
					gameMessage = blockedPathMessages[mapLocation];
				}
				break;

			case "south":
				if (mapLocation < 6) {
					mapLocation += 3;
				}
				else {
					gameMessage = blockedPathMessages[mapLocation];
				}
				break;

			case "west":
				if (mapLocation % 3 != 0) {
					mapLocation -= 1;
				}
				else {
					gameMessage = blockedPathMessages[mapLocation];
				}
				break;

			case "take":
				takeItem();
				break;

			case "drop":
				dropItem();
				break;

			case "use":
				useItem();
				break;

			default:
				gameMessage = "<br>I don't understand that.";
		}

		//Render the game
		render();
	}

	function takeItem() {
		//Find the index number of the item in the items array
		var itemIndexNumber = items.indexOf(item);

		//Does the item exist in the game world and is it at the player's current location
		if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation) {
			gameMessage = "You took the" + item + ".";

			//Add item to backpack
			backpack.push(item);

			//Remove the item from game world
			items.slice(itemIndexNumber, 1);
			itemLocations.slice(itemIndexNumber, 1);
		}
		else {
			//Message if the player tries to take at a different location
			gameMessage = "<br>You can't do that";
		}
	}

	function dropItem() {
		//Try to drop item only if the backpack isn't empty
		if (backpack.length !== 0) {
			//Find the item's array index number on the backpack
			var backpackIndexNumber = backpack.indexOf(item);
			//The item is in the backpack if backpackIndexNumber isn't -1
			if (backpackIndexNumber !== -1) {
				//Tell the player that the item has been dropped
				gameMessage = "You dropped the " + item + ".";
				//Add the item from the backpack to the game world
				items.push(backpack[backpackIndexNumber]);
				itemLocations.push(mapLocation);
				backpack.slice(backpackIndexNumber, 1);
			}
			else {
				//Message if the play tries to drop something that's not in the backpack
				gameMessage = "You can't do that";
			}
		}
		else {
			//Message if the backpack is empty
			gameMessage = "You're not carrying anything.";
		}
	}

	function useItem() {
		//1. Find out if the item is in the backpack
		//2. Find out item's array index number in the backpack
		var backpackIndexNumber = backpack.indexOf(item);
		//If the index number is -1, then it isn't in the backpack
		//Tell the player that they're not carrying it
		if (backpackIndexNumber === -1) {
			gameMessage = "You're not carrying it.";
		}
		//If there are no items in the backpack, then tell the player the backpack is empty
		if (backpack.length === 0) {
			gameMessage.append(" Your backpack is empty.");
		}
		//3. If the item is in the backpack, fiure out what to do with it
		if (backpackIndexNumber !== -1) {
			switch (item) {
				case "flute":
					gameMessage = "Beautiful music fills the air.";
					break;

				case "sword":
					if (mapLocation == 3) {
						gameMessage = "You swing the sword and slay the dragon!";
					}
					else {
						gameMessage = "You swing the sword listlessly.";
					}
					break;

				case "stone":
					if (mapLocation === 1) {
						gameMessage = "You drop the stone in the well.";
						//Remove the stone from the backpack
						backpack.slice(backpackIndexNumber, 1);
					}
					else {
						gameMessage = "You fumble with the stone in your pocket.";
					}
					break;
			}
		}
	}

	function render() {
		//Render Location
		output.html(map[mapLocation]);
		image.attr("src", "images/" + images[mapLocation]);

		//Display Item if there is one in this location
		//1. Loop through all the game items
		for (var i = 0; i < items.length; i++) {
			//Find out if there's an item at this location
			if (mapLocation === itemLocations[i]) {
				//Display it
				output.append("<br>You see a <strong>" + items[i] + "</strong> here.");
			}
			else {
				output.append("");
			}

			if (backpack.length !== 0) {
				output.append("<br>You are carrying: " + backpack.join(", "));
			}
		}

		output.append("<br>");
		output.append("<em>" + gameMessage + "</em>");
	}
});