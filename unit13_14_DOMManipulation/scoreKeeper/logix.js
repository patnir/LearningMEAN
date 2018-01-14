var p1 = document.querySelector("#p1");
var p2 = document.querySelector("#p2");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");

var p1score = 0;
var p2score = 0;

p1.addEventListener("click", function() {
	p1score += 1;
	updateScore();
});

p2.addEventListener("click", function() {
	p2score += 1;
	updateScore();
});

reset.addEventListener("click", function() {
	p1score = 0;
	p2score = 0;
	updateScore();

});

function updateScore() {
	h1.textContent = p1score.toString() + " to " + p2score.toString();

	if (p1score === 5) {
		alert("Player 1 wins");
		p1score = 0;
		p2score = 0;
	}
	else if (p2score === 5) {
		alert("Player 2 wins");
		p1score = 0;
		p2score = 0;
	}

	h1.textContent = p1score.toString() + " to " +  p2score.toString();

}