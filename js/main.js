let todos = [];

const todoArea = document.getElementById("outputArea");

// Give class to the table row which has completed task
const addClass = () => {
    for (let i=0; i < todos.length; i++) {
        if (todos[i].completed) {
            document.getElementById(`row${i+1}`).classList.add("completedTask")
        } else {
            document.getElementById(`row${i+1}`).classList.remove("completedTask")
        };
    };
}

// Sort the array to make incomplete tasks come first
const sortTodo = () => {
    todos.sort((a, b) => {
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
    })
}

// Render todo list(table)
const renderTodos = () => {
    // Create table title
    const todolistTitle = document.createElement("h2");
    todolistTitle.innerHTML = "YOUR TODO LIST:";

    // Create table element
    const todoTable = document.createElement("table");

    // create table header
    const tableHeader = todoTable.createTHead();
    const tableHeaderRow = tableHeader.insertRow();
    const todoNameHeader = tableHeaderRow.insertCell();
    const todoCreatedDateHeader = tableHeaderRow.insertCell();
    const todoCheckHeader = tableHeaderRow.insertCell();
    const todoCompletedDateHeader = tableHeaderRow.insertCell();
    todoNameHeader.innerHTML = "Task name";
    todoCreatedDateHeader.innerHTML = "Date created";
    todoCheckHeader.innerHTML = "Completed";
    todoCompletedDateHeader.innerHTML = "Completed date";

    // create table body using for loop
    const tableBody = todoTable.createTBody();
    for (i = 0; i < todos.length; i++) {
        const todoRow = tableBody.insertRow();
        // Give id to each row
        todoRow.id = `row${i+1}`
        const todoName = todoRow.insertCell();
        const todoCreatedDate = todoRow.insertCell();
        const todoCheck = todoRow.insertCell();
        const todoCompletedDate = todoRow.insertCell();
        // Create table contents
        todoName.innerHTML = todos[i].name;
        todoCreatedDate.innerHTML = todos[i].date;
        // render the checkbox according to the status of each todo
        if (todos[i].completed) {
            todoCheck.innerHTML = `<input type="checkbox" class="todoCheckbox" id="todo${i + 1}" checked>`
        } else {
            todoCheck.innerHTML = `<input type="checkbox" class="todoCheckbox" id="todo${i + 1}">`
        }
        todoCompletedDate.innerHTML = todos[i].completedDate;
    };

    // render table title in the area
    todoArea.appendChild(todolistTitle);

    // render table in the area
    todoArea.appendChild(todoTable);
    addClass();
};

// Action when "Add to list" button clicked
addButton.addEventListener("click", () => {
    // clear output area
    outputArea.innerHTML = "";

    // create object in todos array
    const date = new Date
    const todo = {
        name: userInput.value,
        date: date.toDateString(),
        completed: false,
        completedDate: ""
    }

    // Create an array which has only the names of the tasks
    const todoNames = todos.map((todo) => {
        return todo.name;
    });

    // Check entered value
    if (userInput.value === "") {
        alert("Please enter something.");
        if (todos.length > 0) {
            renderTodos();
        }
    } else if(todoNames.includes(userInput.value)) {
        alert("That todo is already in the list");
            renderTodos();
    } else {
        todos.push(todo);
        sortTodo();
        renderTodos();
    }
    userInput.value = "";
    userInput.focus();
});

// Update the list in UI
updateButton.addEventListener('click', () => {
    // select all the checkbox
    const todoChecked = document.querySelectorAll(".todoCheckbox");
    // check if the array is not empty
    if (todos.length === 0) {
        alert("You have no task now.")
    } else {
        // If checkbox is checked, mark as completed and add completed date
        for (let i=0; i < todoChecked.length; i++) {
            if (todoChecked[i].checked) {
                const date = new Date
                todos[i].completed = true;
                todos[i].completedDate = date.toDateString();
            } else {
                todos[i].completed = false;
                todos[i].completedDate = "";
            }
        }
    // clear output area and render the list
    outputArea.innerHTML = "";
    sortTodo();
    renderTodos();
    }
});

// Clear all todos
clearButton.addEventListener("click", () => {
    todos = [];
    outputArea.innerHTML = "";
    userInput.value = "";
    alert("All the tasks cleared");
});