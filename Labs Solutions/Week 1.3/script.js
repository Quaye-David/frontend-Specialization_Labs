// Get references to DOM elements
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('due-date');
const addButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const sortAscButton = document.getElementById('sort-asc');
const sortDescButton = document.getElementById('sort-desc');
const filterActiveButton = document.getElementById('filter-active');
const filterCompletedButton = document.getElementById('filter-completed');

// Array to store to-do items
let todos = [];

// Function to create a new to-do item element
function createTodoItem(todo) {
  const todoItem = document.createElement('div');
  todoItem.classList.add('todo-item');
  if (todo.completed) {
    todoItem.classList.add('completed');
  }

  const todoContent = document.createElement('div');
  const formattedDate = todo.dueDate.toISOString().slice(0, 16).replace('T', ' ');
  todoContent.textContent = `${todo.title} - ${formattedDate}`;
  if (todo.description) {
    todoContent.textContent += ` - ${todo.description}`;
  }

  const todoActions = document.createElement('div');
  todoActions.classList.add('todo-actions');

  const completeButton = document.createElement('button');
  completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
  completeButton.addEventListener('click', () => toggleTodoCompletion(todo));

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => editTodo(todo));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete');
  deleteButton.addEventListener('click', () => deleteTodo(todo));

  todoActions.appendChild(completeButton);
  todoActions.appendChild(editButton);
  todoActions.appendChild(deleteButton);

  todoItem.appendChild(todoContent);
  todoItem.appendChild(todoActions);

  return todoItem;
}

// Function to add a new to-do item
function addTodo() {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = new Date(dueDateInput.value);

  if (validateTodoInput(title, dueDate)) {
    const newTodo = createNewTodoItem(title, description, dueDate);
    todos.push(newTodo);
    renderTodos();
    clearForm();
    clearErrorMessage();
  } else {
    showErrorMessage('Please fill in the required fields.');
  }
}

function validateTodoInput(title, dueDate) {
  return title && !isNaN(dueDate.getTime());
}

function createNewTodoItem(title, description, dueDate) {
  return {
    title,
    description,
    dueDate,
    completed: false
  };
}

function clearForm() {
  titleInput.value = '';
  descriptionInput.value = '';
  dueDateInput.value = '';
}

// Function to render the to-do list
function renderTodos() {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const todoItem = createTodoItem(todo);
    todoList.appendChild(todoItem);
  });
}

// Function to toggle the completion status of a to-do item
function toggleTodoCompletion(todo) {
  todo.completed = !todo.completed;
  const todoItem = document.querySelector(`[data-id="${todo.id}"]`);
  if (todoItem) {
    todoItem.classList.toggle('completed', todo.completed);
    const completeButton = todoItem.querySelector('button');
    completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
  }
}

function filterTodos(completed) {
  if (completed === null) {
    renderTodos();
  } else {
    const filteredTodos = todos.filter(todo => todo.completed === completed);
    todoList.innerHTML = ''; // Clear the current list
    filteredTodos.forEach(todo => {
      const todoItem = createTodoItem(todo);
      todoList.appendChild(todoItem);
    });
  }
}

// Function to edit an existing to-do item
function editTodo(todo) {
  const newTitle = prompt('Enter the new title:', todo.title);
  const newDescription = prompt('Enter the new description:', todo.description);
  const newDueDateInput = prompt('Enter the new due date (YYYY-MM-DD HH:mm):', todo.dueDate.toLocaleString());
  const newDueDate = new Date(newDueDateInput);
  if (isNaN(newDueDate.getTime())) {
    alert('Invalid date format. Please enter a valid date.');
    return;
  }

  if (newTitle && newDueDate) {
    todo.title = newTitle;
    todo.description = newDescription;
    todo.dueDate = newDueDate;
    renderTodos();
  }
}

// Function to delete a to-do item
function deleteTodo(todo) {
  todos = todos.filter(t => t !== todo);
  renderTodos();
}

// Function to sort todos by due date (ascending)
function sortTodosAsc() {
  todos.sort((a, b) => a.dueDate - b.dueDate);
  renderTodos();
}

// Function to sort todos by due date (descending)
function sortTodosDesc() {
  todos.sort((a, b) => b.dueDate - a.dueDate);
  renderTodos();
}

// Function to show an error message
function showErrorMessage(message) {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;
  todoList.insertAdjacentElement('beforebegin', errorMessage);
}

// Function to clear the error message
function clearErrorMessage() {
  const errorMessage = document.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

// Event listeners
addButton.addEventListener('click', addTodo);
sortAscButton.addEventListener('click', sortTodosAsc);
sortDescButton.addEventListener('click', sortTodosDesc);
filterActiveButton.addEventListener('click', () => filterTodos(false));
filterCompletedButton.addEventListener('click', () => filterTodos(true));