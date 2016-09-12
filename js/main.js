$(".hide-modal, .show-modal").on("click", function() {
	console.log("here")
	$(".modal, .hide-modal, .show-modal").toggle();
});

SCALE = 25;
var tickRate = .1;

if (window.innerWidth <= 1000) {
	tickRate = .13;
	SCALE = 20;
} 
if (window.innerWidth <= 700) {
	tickRate = .15;
} 
if (window.innerWidth <= 825) {
	$(".arrows").attr("src", "images/swipe_right.svg")
}

var cols = Math.floor(window.innerWidth / SCALE);
var rows = Math.floor(window.innerHeight / SCALE);

var snake;
var fruit;
var fruit2;
var score = 0;
var currentInterval = 0;
var collisions = true;
var AI = true;

// Helper functions
function resizeCanvas(canvas) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	cols = Math.floor(window.innerWidth / SCALE)
	rows = Math.floor(window.innerHeight / SCALE)
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

function keyPressed(event) {
	var keyCode = event.keyCode;
	var info = document.getElementsByClassName("info")[0];
	switch (keyCode) {
		case 37: // LEFT KEY PRESS
			if (snake.xvel != 1) {	
				snake.changeDir(-1, 0);
			}
			break;
		case 38: // UP KEY PRESS
			if (snake.yvel != 1) {	
				snake.changeDir(0, -1);
			}
			info.style.opacity = "0";
			break;
		case 39: // RIGHT KEY PRESS
			if (snake.xvel != -1) {	
				snake.changeDir(1, 0);
			}
			break;
		case 40: // DOWN KEY PRESS
			if (snake.yvel != -1) {	
				snake.changeDir(0, 1);
			}
			info.style.opacity = "0";
			break;
	}
}

// Game Logic
function init() {

	// Initiate canvas and insert into DOM
	var canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);

	// Create new game objects
	snake = new Snake(5 * SCALE, 5 * SCALE);
	fruit = new Fruit();
	fruit.generatePos();
	fruit2 = new Fruit();
	fruit2.generatePos();

	// Reset score
	score = 0;

	// Make game info visible at bottom of screen
	document.getElementsByClassName("info")[0].style.opacity = "1";

	// Add key event listeners to body
	document.addEventListener("keydown", keyPressed);

	return canvas;
}

function update() {
	snake.update();
	fruit.check();
	fruit2.check();
}

function draw(ctx, canvas) {
	ctx.fillStyle = "#111"; // Set background color to black
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	snake.draw(ctx);
	fruit.draw(ctx)
	fruit2.draw(ctx)
	ctx.fillStyle = "#ccc";
	if (window.innerWidth < 1200) {
		ctx.font = "16px Neue Haas Unica";
		ctx.fillText("score: " + score, SCALE, window.innerHeight - 34);
	} else {
		ctx.font = "20px Neue Haas Unica";
		ctx.fillText("score: " + score, SCALE, rows * SCALE - SCALE);
	}
}

function main() {
	var activeCanvases = document.getElementsByTagName("canvas");
	for (var i = 0; i < activeCanvases.length; i++) {
		activeCanvases[i].remove();
	}
	var canvas = init();
	var ctx = canvas.getContext("2d");
	window.addEventListener("resize", function() {
		resizeCanvas(canvas)
	});
	window.clearInterval(currentInterval);
	currentInterval = setInterval(function() {
		update();
		draw(ctx, canvas);
	}, tickRate * 1000);
}

document.getElementsByClassName("restart")[0].addEventListener("click", function() {
	main();
});

document.getElementsByClassName("toggle")[0].addEventListener("click", function() {
	collisions = !collisions;
	var collText = document.getElementsByClassName("toggle")[0];
	if (collisions) {
		collText.innerHTML = "collisions-true";
	} else {
		collText.innerHTML = "collisions-false";
	}
});

main()