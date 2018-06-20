var docBody = document.querySelector("body");
var squares = document.querySelectorAll(".square");
var rgbTarget = document.querySelector("h1 span");
var colors = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(0, 255, 255)", "rgb(255, 0, 255)", "rgb(255, 255, 0)"];
var pickedColor = colors[3];

for (var i = 0; i < squares.length; i++) {
	//Add initial colors to squares
	squares[i].style.backgroundColor = colors[i];

	//Add event listeners
	squares[i].addEventListener("click", function(){
		//grab color of clicked square and compare to target color
		var clickedColor = this.style.backgroundColor;
		if (clickedColor === pickedColor){
			//Correct

		}
		else{
			//Wrong
			this.style.backgroundColor = "#232323";
		}
	});
}

rgbTarget.textContent = pickedColor;