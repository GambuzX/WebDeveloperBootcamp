$("ul").on("click", "li", function(){
	$(this).toggleClass("checked");
})

$("ul").on("click", "li span", function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
})

$("input[type='text']").on("keypress", function(event){
	if (event.which === 13) {
		//Extract text
		var textContent = $(this).val();
		//Make new li and add to ul
		$("ul").append("<li><span>X</span> " + textContent + "</li>");
		//Remove previous text
		$(this).val("");
	}
})