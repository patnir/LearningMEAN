var button = document.querySelector("button");
//var body = document.querySelector("body");

//var isPurple = false;

button.addEventListener("click", function() {
	//alert("Clicked");
	// if (isPurple) {
	// 	body.style.background = "white";
	// }
	// else {
	// 	body.style.background = "purple";
	// }
	// isPurple = !isPurple;

	document.body.classList.toggle("purple");
});