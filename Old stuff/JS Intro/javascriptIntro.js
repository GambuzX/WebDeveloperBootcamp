/*var firstName = prompt("First name?");
var lastName = prompt("Last name?");
var age = prompt("Age?");

console.log("Your full name is " + firstName + " " + lastName);
console.log("Your age is " + age);*/

var answer = prompt("Are we there yet?");

while (answer.indexOf("yes") === -1 && answer !== "yeah") {
	answer = prompt("Are we there yet?");
}

alert("Yay, we finally made it!!!");