//Get reference Dom elements
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('due-date');
const addButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const sortAscButton = document.getElementById('sort-asc');
const sortDescButton = document.getElementById('sort-desc');
const filterActiveButton = document.getElementById('filter-active');
const filterCompletedButton = document.getElementById('filter-completed');

//Array to store todo items
let todos = [];


//Function to add todo item
function createTodoItem(todo) {

    //Create the main todo item container
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    //Add the 'completed' class if the todo item is completed
    if (todo.completed) {
        todoItem.classList.add('completed');
    }

    //create the todo content content element
    const todoContent = document.createElement('div');
    todoContent.textContent = `${todo.title} - ${todo.dueDate.toLocalDateString()}`;
    if (todo.description) {
        todoContent.textContent += ` - ${todo.description}`;
    }

    //Create the todo actions container
    const todoActions = document.createElement('div');
    todoActions.classList.add('todo-actions');

    //Create the complete/undo button
    const completeButton = document.createElement('button');
    completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
    completeButton.addEventListener('click', () => toggleTodoComplete(todo));

    //create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => deleteTodoItem(todo));

    //Append the buttons to the actions container
    todoActions.appendChild(completeButton);
    todoActions.appendChild(deleteButton);
    todoActions.appendChild(editButton);

    //Append the content and actions to the main todo item
    todoItem.appendChild(todoContent);
    todoItem.appendChild(todoActions);

    return todoItem;
}

function addTodo() {
    // Get the values from the input feilds
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const dueDate = new Date(dueDateInput.value);

    //Validate the input
    if (title && dueDate) {
        //Create a new todo item
        const todo = {
            title,
            description,
            dueDate,
            completed: false
        };

        //Add the todo item to the array
        todos.push(todo);

        //Create the todo item element and append it to the list
        const todoItem = createTodoItem(todo);
        todoList.appendChild(todoItem);

        //Clear the input fields
        titleInput.value = '';
        descriptionInput.value = '';
        dueDateInput.value = '';

    } else {
        alert('Please enter a title and due date');
    }
}