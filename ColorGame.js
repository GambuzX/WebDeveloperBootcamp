var docBody = document.querySelector("body");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var squares = document.querySelectorAll(".square");
var rgbTarget = document.querySelector("h1 span");
var colors = generateRandomColors(6);
var pickedColor = pickColor();

rgbTarget.textContent = pickedColor;

for (var i = 0; i < squares.length; i++) {
	//Add initial colors to squares
	squares[i].style.backgroundColor = colors[i];
	//Add event listeners
	squares[i].addEventListener("click", function(){
		//grab color of clicked square and compare to target color
		var clickedColor = this.style.backgroundColor;
		if (clickedColor === pickedColor){
			//Correct
			message.textContent = "Correct!";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
			resetButton.textContent = "Play Again?";
		}
		else{
			//Wrong
			this.style.backgroundColor = "#232323";
			message.textContent = "Try Again!";
		}
	});
}

resetButton.addEventListener("click", function() {
	//generate all new colors
	colors = generateRandomColors(6);
	//pick a new random color
	pickedColor = pickColor();
	//change color display to match picked color
	rgbTarget.textContent = pickedColor;
	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
	//reset h1 background color
	h1.style.backgroundColor = "#232323";
	//remove previous message
	message.textContent = "";
	//reset reset button message
	resetButton.textContent = "New Colors";

})

function changeColors(color) {
	//Loop through all squares
	//Change color to the given one
	for (var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
}

function generateRandomColors(nColors) {
	var generatedColors = [];
	for (var i = 0; i < nColors; i++){
		generatedColors.push(randomColor());
	}
	return generatedColors;
}

function randomColor() {
	//Color components go from 0 to 255
	var R = String(Math.floor(Math.random() * 256));
	var G = String(Math.floor(Math.random() * 256));
	var B = String(Math.floor(Math.random() * 256));
	return "rgb(" + R + ", " + G + ", " + B + ")";
}