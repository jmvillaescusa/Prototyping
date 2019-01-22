$(document).ready(function () {
	var stage = $("#stage");
	var output = $("#output");

	window.addEventListener("keydown", keydownHandler, false);

	//The game map
	var map = [[0, 2, 0, 0, 0, 3],    //For individual data - map[3][4] = 2
	[0, 0, 0, 1, 0, 0],    //Rows - [3] - Vertical
	[0, 1, 0, 0, 0, 0],    //Column - [4] - Horizontal
	[0, 0, 0, 0, 2, 0],    //***ROWS then COLUMNS***
	[0, 2, 0, 1, 0, 0],
	[0, 0, 0, 0, 0, 0]];

	var gameObjects = [[0, 0, 0, 0, 0, 0],
	[0, 0, 5, 0, 0, 0],
	[0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0],
	[4, 0, 0, 0, 0, 0]];

	//Map Codes
	var WATER = 0;
	var ISLAND = 1;
	var PIRATE = 2;
	var HOME = 3;
	var SHIP = 4;
	var MONSTER = 5;

	//The size of each cell
	var SIZE = 64;

	//The number of row and columns
	var ROWS = map.length;
	var COLUMNS = map[0].length;

	//Find the ship's and monster's start position
	var shipRow;
	var shipColumn;
	var monsterRow;
	var monsterColumn;

	for (var row = 0; row < ROWS; row++) {
		for (var column = 0; column < COLUMNS; column++) {
			if (gameObjects[row][column] === SHIP) {
				shipRow = row; //= 5
				shipColumn = column; //= 0
			}

			if (gameObjects[row][column] === MONSTER) {
				monsterRow = row; //= 1
				monsterColumn = column; //= 2
			}
		}
	}

	//Arrow Key Codes
	var UP = 38;
	var DOWN = 40;
	var RIGHT = 39;
	var LEFT = 37;

	//Game Variables
	var food = 10;
	var gold = 10;
	var experience = 0;
	var gameMessage = "Use arrow keys to find your way home";

	render();

	function keydownHandler(event) {
		switch (event.keyCode) {
			case UP:
				if (shipRow > 0) {
					gameObjects[shipRow][shipColumn] = 0;    //Clear the ship's current cell
					shipRow--;                               //Subtract 1 from the ship's row (move the ship up)
					gameObjects[shipRow][shipColumn] = SHIP; //Apply the ship's updated position to the new array
				}
				break;

			case DOWN:
				if (shipRow < ROWS - 1) {
					gameObjects[shipRow][shipColumn] = 0;
					shipRow++;
					gameObjects[shipRow][shipColumn] = SHIP;
				}
				break;

			case LEFT:
				if (shipColumn > 0) {
					gameObjects[shipRow][shipColumn] = 0;
					shipRColumn--;
					gameObjects[shipRow][shipColumn] = SHIP;
				}
				break;

			case RIGHT:
				if (shipColumn < COLUMNS - 1) {
					gameObjects[shipRow][shipColumn] = 0;
					shipColumn++;
					gameObjects[shipRow][shipColumn] = SHIP;
				}
				break;
		}

		//Find out what cell the player is on
		switch (map[shipRow][shipColumn]) {
			case WATER:
				gameMessage = "You sail the open seas";
				break;

			case PIRATE:
				fight();
				break;

			case ISLAND:
				trade();
				break;

			case HOME:
				endGame();
				break;
		}

		//Move the monster 
		moveMonster();

		//Find out the ship and monster are in contact
		if (gameObjects[shipRow][shipColumn] === MONSTER) {
			endGame();
		}

		//Subtract some food each turn
		food--;

		//Find out if shi[ has run out of food or gold
		if (food <= 0 || gold <= 0) {
			endGame();
		}

		//Render the Game
		render()
	}

	function moveMonster() {
		//The 4 possible directions that the monster can move
		var UP = 1;
		var DOWN = 2;
		var LEFT = 3;
		var RIGHT = 4;

		//An array to store the valid directions that the monster can move in
		var validDirections = [];

		//The final direction that the monster will move in
		var direction = undefined;

		//Find out ehat kinds of things are in the cells that surround the monster
		//If the cell contains water, push the corresponding direction into the
		//validDirections array
		if (monsterRow > 0) {
			var thingsAbove = map[monsterRow - 1][monsterColumn];
			if (thingsAbove === WATER) {
				validDirections.push(UP);
			}
		}

		if (monsterRow < ROWS - 1) {
			var thingsBelow = map[monsterRow + 1][monsterColumn];
			if (thingsBelow === WATER) {
				validDirections.push(DOWN);
			}
		}

		if (monsterColumn > 0) {
			var thingsToTheLeft = map[monsterRow][monsterColumn - 1];
			if (thingsToTheLeft === WATER) {
				validDirections.push(LEFT);
			}
		}

		if (monsterColumn < COLUMNS - 1) {
			var thingsToTheRight = map[monsterRow][monsterColumn + 1];
			if (thingsToTheRight === WATER) {
				validDirections.push(RIGHT);
			}
		}

		//The validDirections array now contains 0 to 4 directions that contain WATER cells
		//Which of thost directions will the monster choost to move in?
		//If a valid direction was found, Randomly choose one of the possible directions,
		//and assign it to the direction variable
		if (validDirections, length !== 0) {
			var randomNumber = Math.floor(Math.random() * validDirections.length);
			direction = validDirections[randomNumber];
		}

		//Move the monster in the chosen directon
		switch (direction) {
			case UP:
				gameObjects[monsterRow][monsterColumn] = 0;
				monsterRow--;
				gameObjects[monsterRow][monsterColumn] = MONSTER;
				break;

			case DOWN:
				gameObjects[monsterRow][monsterColumn] = 0;
				monsterRow++;
				gameObjects[monsterRow][monsterColumn] = MONSTER;
				break;

			case LEFT:
				gameObjects[monsterRow][monsterColumn] = 0;
				monsterColumn--;
				gameObjects[monsterRow][monsterColumn] = MONSTER;
				break;

			case RIGHT:
				gameObjects[monsterRow][monsterColumn] = 0;
				monsterColumn++;
				gameObjects[monsterRow][monsterColumn] = MONSTER;
				break;
		}
	}

	function trade() {
		//figure out how much food the island has and how much it cost
		var islandFood = experience + gold;
		var cost = Math.ceil(Math.random() * islandFood);

		//Let the player buy food if there's enough gold to afford it
		if (gold > cost) {
			food += islandFood
			gold -= cost
			experience += 2;

			gameMessage = "You buy " + islandFood + " coconuts" + " for " + cost + "gold pieces.";
		}
		else {
			//Tell the player if they don't have enough gold
			experience += 1;
			gameMessage = "You don't have enough gold to buy food";
		}
	}

	function fight() {
		//The ship's strength
		var shipStrength = Math.ceil((food + gold) / 2);

		//A random number between 1 and the ship's strength
		var pirateStrength = Math.ceil(Math.random() * shipStrength * 2);

		if (pirateStrength > shipStrength) {
			//The pirates steal some gold
			var stolenGold = Math.round(pirateStrength / 2);
			gold -= stolenGold;

			//Give the player some experience for trying
			experience += 1;

			//Update the game message
			gameMessage = "You fight and LOSE " + stolenGold + " gold pieces." + " Ship strength: " + shipStrength + " Pirates's strength: " + pirateStrength;
		}
		else {
			//You win the pirate's gold
			var pirateGold = Math.round(pirateStrength / 2);
			gold += pirateGold;

			//Add some experience
			experience += 2;

			//Update the game message
			gameMessage = "You fight and WIN " + pirateGold + " gold pieces." + " Ship's strength: " + shipStrength + " Pirate's strength: " + pirateStrength;
		}
	}

	function endGame() {

	}

	function render() { }
});