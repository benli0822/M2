task = function(content, status) {
	this.content = content;
	this.status = status;
};

var model = {};

model.createTask = function createNewTask(value) {
	var newTask = new task(value, "todo");
	todoListApplication.todoTaskList.push(newTask);
};

model.finishTask = function finishTask(value) {
	for(var i = 0; i < todoListApplication.todoTaskList.length; i++) {
		if(todoListApplication.todoTaskList[i].content === value) {
			todoListApplication.todoTaskList[i].status = "done";
		}
	}
};

model.deleteTask = function deleteTask(value) {

	for(var i = 0; i < todoListApplication.todoTaskList.length; i++) {
		if(todoListApplication.todoTaskList[i].content === value) {
			todoListApplication.todoTaskList[i].status = "deleted";
			console.log(todoListApplication.todoTaskList[i]);
			todoListApplication.deleteTaskList.push(todoListApplication.todoTaskList[i]);
			todoListApplication.todoTaskList.splice(i, 1);
		}
	}
};