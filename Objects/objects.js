$(document).ready(function () {
	var robot = {
		material: "titanium",
		happy: true,
		makeBreakfast: function () {
			console.log("Here are waffles and milk, master.");
		}
	};
	console.log("robot: " + robot.material);

	//Creates an independent object from robot
	//Has the same variables/functions but different values
	var newRobot = Object.create(robot); 
	newRobot.material = "transparent aluminum";
	console.log("newRobot: " + newRobot.material);

	var robotThree = Object.create(robot);
	robotThree.makeBreakfast();
	
	//Another way to make objects
	var Player = function (x, y) {
		this.x = x;       //this - refers to itself	
		this.y = y;
		this.jump = function () {
			console.log("Jump");
		}
	};

	window.addEventListener("keyup", button, false);

	function button() {
		Mario.jump();
	}

	var Mario = new Player(100, 200);
	var Luigi = new Player(200, 200);
	//Mario.jump();
});