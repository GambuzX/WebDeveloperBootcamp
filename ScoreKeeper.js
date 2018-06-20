var playerOne = 0;
var playerTwo = 0;
var winningScore = 5;
var gameOver = false;

var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var playerOneButton = document.querySelector("#p1");
var playerTwoButton = document.querySelector("#p2");
var resetButton = document.querySelector("#reset");
var h1 = document.querySelector("h1");
var winningScoreDisplay = document.querySelector("#winningScore");
var numInput = document.querySelector("input");

playerOneButton.addEventListener("click", function() {
	if (!gameOver) {
		playerOne++;

		if (playerOne === winningScore){
			gameOver = true;
			p1Display.classList.add("winner");
		}

		p1Display.textContent = playerOne;
	}
});

playerTwoButton.addEventListener("click", function() {
	if (!gameOver) {
		playerTwo++;

		if (playerTwo === winningScore){
			p2Display.classList.add("winner");
			gameOver = true;
		}

		p2Display.textContent = playerTwo;
	}
});

resetButton.addEventListener("click", resetScore);

numInput.addEventListener("change", function() {
	winningScoreDisplay.textContent = this.value;
	winningScore = Number(this.value);
	resetScore();
});

function resetScore() {
	gameOver = false;
	playerOne = 0;
	playerTwo = 0;
	p1Display.textContent = 0;
	p2Display.textContent = 0;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
}
