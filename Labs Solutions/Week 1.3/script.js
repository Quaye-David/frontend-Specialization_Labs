// Data structure
let todos = [];

// Helper functions for data manipulation and storage
const generateId = () => Date.now().toString(36) + Math.random().toString(36);
const saveToStorage = () => localStorage.setItem("todos", JSON.stringify(todos));
const loadFromStorage = () => {
    const stored = localStorage.getItem("todos");
    if (stored) {
        todos = JSON.parse(stored).map(todo => ({
            ...todo,
            dueDateTime: new Date(todo.dueDateTime),
            createdAt: new Date(todo.createdAt)
        }));
    }
};

const createTodo = (todoData) => {
    const { title, description = "", dueDateTime } = todoData;
    if (!title || !dueDateTime) throw new Error("Title and due date are required");

    const newTodo = {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        dueDateTime: new Date(dueDateTime),
        completed: false,
        createdAt: new Date()
    };
    
    todos.push(newTodo);
    saveToStorage();
    return newTodo;
};

const updateTodo = (id, updates) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return;
    
    todos[index] = {
        ...todos[index],
        ...updates,
        dueDateTime: updates.dueDateTime ? new Date(updates.dueDateTime) : todos[index].dueDateTime
    };
    
    saveToStorage();
    renderTodos();
};

const deleteTodo = (id) => {
    if (!confirm("Delete this todo?")) return;
    todos = todos.filter(todo => todo.id !== id);
    saveToStorage();
    renderTodos();
};

// UI functions
const createTodoElement = (todo) => {
    const isOverdue = !todo.completed && new Date(todo.dueDateTime) < new Date();
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""}`;
    li.dataset.id = todo.id;
    
    li.innerHTML = `
        <input type="checkbox" ${todo.completed ? "checked" : ""}>
        <div class="todo-content">
            <h3>${todo.title}</h3>
            ${todo.description ? `<p>${todo.description}</p>` : ""}
            <small>Due: ${new Date(todo.dueDateTime).toLocaleString()}</small>
        </div>
        <div class="todo-actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    li.querySelector("input").onchange = () => {
        updateTodo(todo.id, { completed: !todo.completed });
    };
    
    li.querySelector(".edit").onclick = () => {
        li.innerHTML = `
            <form class="edit-form">
                <div class="form-group">
                    <input type="text" value="${todo.title}" required>
                </div>
                <div class="form-group">
                    <textarea>${todo.description}</textarea>
                </div>
                <div class="form-group">
                    <input type="datetime-local" 
                        value="${todo.dueDateTime.toISOString().slice(0, 16)}" 
                        required>
                </div>
                <div class="todo-actions">
                    <button type="submit">Save</button>
                    <button type="button" class="cancel">Cancel</button>
                </div>
            </form>
        `;

        const form = li.querySelector("form");
        form.onsubmit = (e) => {
            e.preventDefault();
            updateTodo(todo.id, {
                title: form.elements[0].value,
                description: form.elements[1].value,
                dueDateTime: form.elements[2].value
            });
        };
        form.querySelector(".cancel").onclick = renderTodos;
    };
    
    li.querySelector(".delete").onclick = () => deleteTodo(todo.id);
    
    return li;
};

const showStatus = (message, type = 'success') => {
    const status = document.getElementById('status-message');
    status.textContent = message;
    status.className = `status-message show ${type}`;
    setTimeout(() => status.classList.remove('show'), 3000);
};

const renderTodos = () => {
    const list = document.getElementById("todo-list");
    const sortBy = document.getElementById("sort-select").value;
    const filterBy = document.getElementById("filter-select").value;
    
    let filtered = [...todos];
    
    // Apply filter
    if (filterBy === "active") filtered = filtered.filter(t => !t.completed);
    if (filterBy === "completed") filtered = filtered.filter(t => t.completed);
    
    // Apply sort
    filtered.sort((a, b) => {
        switch(sortBy) {
            case 'due-asc':
                return a.dueDateTime - b.dueDateTime;
            case 'due-desc':
                return b.dueDateTime - a.dueDateTime;
            case 'created-asc':
                return a.createdAt - b.createdAt;
            case 'created-desc':
                return b.createdAt - a.createdAt;
            default:
                return 0;
        }
    });
    
    list.innerHTML = "";
    filtered.forEach(todo => list.appendChild(createTodoElement(todo)));
};

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
    loadFromStorage();
    
    document.getElementById("todo-form").onsubmit = (e) => {
        e.preventDefault();
        try {
            createTodo({
                title: e.target.title.value,
                description: e.target.description.value,
                dueDateTime: e.target.dueDateTime.value
            });
            e.target.reset();
            renderTodos();
            showStatus("Todo added successfully!");
        } catch (err) {
            showStatus(err.message, "error");
        }
    };
    
    document.getElementById("sort-select").onchange = renderTodos;
    document.getElementById("filter-select").onchange = renderTodos;
    
    renderTodos();
});