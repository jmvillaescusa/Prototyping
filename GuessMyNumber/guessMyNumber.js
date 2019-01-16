$(document).ready(function() {
	//Game Variables
	var mysteryNumber = Math.floor(Math.random() * 100);
	console.log("Number: "+mysteryNumber);
	var playerGuess = 0;      
	var guessesRemaining = 10;    //Lives
	var guessesMade = 0;
	var gameState = "";
	var gameWon = false;

	//The Input and Output fields
	var input = $("#input");
	var output = $("#output");

	//The Button
	var button = $("button");
	button.css("cursor", "pointer");

	button.click(function (e) {
		clickHandler();
	});

	window.addEventListener("keydown", keyDownHandler, false);

	function keyDownHandler(event) {
		if (event.keyCode === 13) {
			clickHandler();
		}
	}

	function clickHandler() {
		playerGuess = input.val();

		if (isNaN(playerGuess)) {
			output.html("Please enter a number.");
		}
		else {
			playGame();
		}
	}

	function playGame() {
		guessesRemaining -= 1;
		guessesMade += 1;
		gameState = " Guess: " + guessesMade + ", Remaining: " + guessesRemaining;

		if (playerGuess > mysteryNumber) {
			output.html("That's too high." + gameState);
			if (guessesRemaining < 1) {
				endGame();
			}
		}
		else if (playerGuess < mysteryNumber) {
			output.html("That's too low." + gameState);
			if (guessesRemaining < 1) {
				endGame();
			}
		}
		else if (playerGuess == mysteryNumber) {
			gameWon = true;
			endGame();
		}
	}

	function endGame() {
		if (gameWon == true) {
			output.html("Yes, it's " + mysteryNumber + "!" + "<br>" + "It only took you " + guessesMade + " guesse(s).");
		}
		else {
			output.html("No more guesses left!" + "<br>" + "The number was " + mysteryNumber + ".");
		}
		button.attr("disabled", true);
		window.removeEventListener("keydown", keyDownHandler, false);
		input.attr("disabled", true);
	}
});