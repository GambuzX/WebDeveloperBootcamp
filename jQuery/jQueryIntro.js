$("div").css("backgroundColor", "purple");
$("div.highlight").css("width", "200px");
$("div#third").css("border", "orange solid 1px");
$("div:first-of-type").css("color", "pink");

$("button").on("click", function() {
    $("div").fadeOut(3000, function() {
    	console.log("Fade completed!");
    });
    });