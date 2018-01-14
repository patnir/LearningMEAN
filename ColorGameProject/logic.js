var colors = [];
var totalColors = 6;
var pickedColor = "";

var squares = document.querySelectorAll(".square");
var message = document.querySelector("#message");

setRandomColors();
assignColorsToSquares();
console.log(colors);
pickRandomColor();
console.log(pickedColor);
console.log(colors);

addEventToSquares();



function pickRandomColor() {
	pickedColor = colors[Math.floor(Math.random() * totalColors)];
	var pickedColorSpan = document.getElementById("pickedColor");
	pickedColorSpan.textContent = pickedColor;
}

function setRandomColors() {
	colors = new Array(totalColors);
	for (var i = 0; i < totalColors; i++) {
		var color1 = Math.floor(Math.random() * 256);
		var color2 = Math.floor(Math.random() * 256);
		var color3 = Math.floor(Math.random() * 256);
		var rgbString = "rgb(" + color1.toString() + ", " + color2.toString() + ", " + color3.toString() + ")";
		colors[i] = rgbString;
	}
}


function assignColorsToSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
}

function assignColorsToAllSquares(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}


function addEventToSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			var currentColor = this.style.backgroundColor;
			if (currentColor === pickedColor) {
				message.textContent = "Correct";
				assignColorsToAllSquares(pickedColor);
			}
			else {
				this.style.backgroundColor = "#232323";
				message.textContent = "Try Again";
			}
		});
	}
}