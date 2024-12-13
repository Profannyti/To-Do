document.getElementById("addTaskButton").addEventListener("click", function () {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToList(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value = ""; 
    }
});

document.addEventListener("DOMContentLoaded", function () {
    loadTasksFromLocalStorage();
});

function addTaskToList(taskText, isCompleted = false) {
    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    if (isCompleted) {
        todoItem.classList.add("checked");
    }

    const taskTextElement = document.createElement("div");
    taskTextElement.classList.add("task-text");
    taskTextElement.textContent = taskText;

    const checkButton = document.createElement("button");
    checkButton.classList.add("check-btn");
    checkButton.textContent = "✔";
    checkButton.addEventListener("click", function () {
        todoItem.classList.toggle("checked");
        toggleTaskCompletion(taskText);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "✖";
    deleteButton.addEventListener("click", function () {
        todoList.removeChild(todoItem);
        removeTaskFromLocalStorage(taskText);
    });

    todoItem.appendChild(checkButton);
    todoItem.appendChild(taskTextElement);
    todoItem.appendChild(deleteButton);

    todoList.appendChild(todoItem);
}

function saveTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToList(task.text, task.completed));
}

function toggleTaskCompletion(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map(task => {
        if (task.text === taskText) {
            return { text: task.text, completed: !task.completed };
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function removeTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
