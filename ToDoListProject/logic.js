// $("li").on("click", function() {
// 	$(this).toggleClass("completed");
// 	// if ($(this).css("color") == "rgb(255, 128, 128)") {
// 	// 	$(this).css("color", "black");
// 	// 	$(this).css("text-decoration", "none");

// 	// }
// 	// else {
// 	// 	$(this).css("color", "rgb(255, 128, 128)");
// 	// 	$(this).css("text-decoration", "line-through");
// 	// }
// }); // Didn't work because onclick did not add functionality to new todos

$("ul").on("click", "li", function() {
	$(this).toggleClass("completed");
});

$("ul").on("click", "li span", function(event) {
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
	event.stopPropagation();
});

$("input[type='text']").on("keypress", function(event) {
	
	if (event.which === 13) {
		var todo = $(this).val();
		var toAdd = "<li><span><i class='fa fa-trash'></i></span> " + todo + "</li>";
		//$("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></span> " + todo + "</li>");
		$("ul").append(toAdd);
		console.log(toAdd);
	} 
	else {
		console.log("Key Press!");
		console.log(event);
	}
});

$(".fa-plus").click(function() {
	$("input[type='text']").fadeToggle();
});