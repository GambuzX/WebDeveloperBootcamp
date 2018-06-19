function todolist() {
	var answer = prompt("What would you like to do?");
	var todoList = [];

	while (answer !== "quit") {
		if (answer === "new") {
			var newTodo = prompt("What do you need to remember?");
			todoList.push(newTodo);
		}
		else if (answer === "list")
			console.log(todoList);
		answer = prompt("What would you like to do?");
	}
}

window.setTimeout(todolist, 500);