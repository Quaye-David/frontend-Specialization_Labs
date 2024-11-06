// Data structure to store todos
let todos = [];

// Generate unique IDs for todo items
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36);
};

// Create new todo object
const createTodo = (todoData) => {
    const { title, description = '', dueDateTime } = todoData;
    
    if (!title || !dueDateTime) {
        throw new Error('Title and due date/time are required');
    }

    return {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        dueDateTime: new Date(dueDateTime),
        completed: false,
        createdAt: new Date()
    };
};

// Add todo to data array
const addTodoToList = (todoData) => {
    try {
        const newTodo = createTodo(todoData);
        todos.push(newTodo);
        saveToLocalStorage();
        return newTodo;
    } catch (error) {
        console.error('Error adding todo:', error);
        throw error;
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load existing todos
    loadFromLocalStorage();
    todos.forEach(todo => displayTodo(todo));

    // Get the form element
    const todoForm = document.getElementById('todo-form');

    // Add submit event listener to form
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from submitting traditionally

        // Get form data
        const formData = {
            title: todoForm.querySelector('#todo-title').value,
            description: todoForm.querySelector('#todo-description').value,
            dueDateTime: todoForm.querySelector('#todo-due-date').value
        };

        try {
            // Add new todo
            const newTodo = addTodoToList(formData);
            displayTodo(newTodo);
            
            // Reset form
            todoForm.reset();

            // Show success message (optional)
            showStatusMessage('Todo added successfully!', 'success');
        } catch (error) {
            // Show error message
            showStatusMessage(error.message, 'error');
        }
    });

     // Add event listeners for sort and filter controls
     document.getElementById('sort-select').addEventListener('change', applySortAndFilter);
     document.getElementById('filter-select').addEventListener('change', applySortAndFilter);
});

// Helper function to show status messages
const showStatusMessage = (message, type = 'success') => {
    const statusElement = document.getElementById('status-message');
    statusElement.textContent = message;
    statusElement.className = `status-message show ${type}`;
    
    // Hide message after 3 seconds
    setTimeout(() => {
        statusElement.classList.remove('show');
    }, 3000);
};

// Create DOM element for todo item
const createTodoElement = (todo) => {
    const li = document.createElement('li');
    li.setAttribute('data-id', todo.id);
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;

    // Format the due date
    const formattedDueDate = todo.dueDateTime.toLocaleString();

    li.innerHTML = `
        <div class="todo-content">
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <div class="todo-info">
                <h3 class="todo-title">${todo.title}</h3>
                ${todo.description ? `<p class="todo-description">${todo.description}</p>` : ''}
                <p class="todo-due-date">Due: ${formattedDueDate}</p>
            </div>
            <div class="todo-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `;

    // Add event listeners
    addTodoEventListeners(li);

    return li;
};

// Add event listeners to todo item
const addTodoEventListeners = (todoElement) => {
    const checkbox = todoElement.querySelector('.todo-checkbox');
    const editBtn = todoElement.querySelector('.edit-btn');
    const deleteBtn = todoElement.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => toggleComplete(todoElement.dataset.id));
    editBtn.addEventListener('click', () => startEditing(todoElement.dataset.id));
    deleteBtn.addEventListener('click', () => deleteTodo(todoElement.dataset.id));
};

// Display todo in the list
const displayTodo = (todo) => {
    const todoList = document.getElementById('todo-list');
    const todoElement = createTodoElement(todo);
    todoList.appendChild(todoElement);
};


const updateTodo = (id, updateData) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        throw new Error('Todo not found');
    }

    const updatedTodo = {
        ...todos[todoIndex],
        ...updateData,
        dueDateTime: updateData.dueDateTime ? new Date(updateData.dueDateTime) : todos[todoIndex].dueDateTime
    };

    todos[todoIndex] = updatedTodo;
    saveToLocalStorage();

    // Update DOM
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    if (todoElement) {
        const newTodoElement = createTodoElement(updatedTodo);
        todoElement.replaceWith(newTodoElement);
    }

    return updatedTodo;
};

// Delete todo
const deleteTodo = (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this todo?');
    if (!confirmDelete) return;

    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();

    // Remove from DOM
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    if (todoElement) {
        todoElement.remove();
    }
};

// Toggle todo complete status
const toggleComplete = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return;

    todo.completed = !todo.completed;
    saveToLocalStorage();

    // Update DOM
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    if (todoElement) {
        todoElement.classList.toggle('completed');
    }
};



// Start editing todo
const startEditing = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return;

    const todoElement = document.querySelector(`[data-id="${id}"]`);
    if (!todoElement) return;

    const todoContent = todoElement.querySelector('.todo-content');
    todoContent.innerHTML = `
        <form class="edit-form">
            <input type="text" class="edit-title" value="${todo.title}" required>
            <textarea class="edit-description">${todo.description}</textarea>
            <input type="datetime-local" class="edit-due-date" value="${formatDateForInput(todo.dueDateTime)}" required>
            <button type="submit" class="save-btn">Save</button>
            <button type="button" class="cancel-btn">Cancel</button>
        </form>
    `;

    const editForm = todoContent.querySelector('.edit-form');
    const cancelBtn = todoContent.querySelector('.cancel-btn');

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updateData = {
            title: editForm.querySelector('.edit-title').value,
            description: editForm.querySelector('.edit-description').value,
            dueDateTime: editForm.querySelector('.edit-due-date').value
        };
        updateTodo(id, updateData);
    });

    cancelBtn.addEventListener('click', () => {
        const newTodoElement = createTodoElement(todo);
        todoElement.replaceWith(newTodoElement);
    });
};

const applySortAndFilter = () => {
    const sortValue = document.getElementById('sort-select').value;
    const filterValue = document.getElementById('filter-select').value;

    let filteredTodos = [...todos];

    // Apply filter
    if (filterValue === 'active') {
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (filterValue === 'completed') {
        filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    // Apply sort
    if (sortValue === 'due-asc') {
        filteredTodos.sort((a, b) => new Date(a.dueDateTime) - new Date(b.dueDateTime));
    } else if (sortValue === 'due-desc') {
        filteredTodos.sort((a, b) => new Date(b.dueDateTime) - new Date(a.dueDateTime));
    } else if (sortValue === 'created-asc') {
        filteredTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortValue === 'created-desc') {
        filteredTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Clear the current list
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    // Display the sorted and filtered todos
    filteredTodos.forEach(todo => displayTodo(todo));
};

// Helper function to format date for datetime-local input
const formatDateForInput = (date) => {
    return new Date(date).toISOString().slice(0, 16);
};

// Local storage functions
const saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const loadFromLocalStorage = () => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos).map(todo => ({
            ...todo,
            dueDateTime: new Date(todo.dueDateTime),
            createdAt: new Date(todo.createdAt)
        }));
    }
};