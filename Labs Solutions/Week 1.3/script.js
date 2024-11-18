// Data structure
let todos = [];

// Helper functions for data manipulation and storage
const generateId = () => Date.now().toString(36) + Math.random().toString(36);

const saveToStorage = () =>
  localStorage.setItem("todos", JSON.stringify(todos));

const loadFromStorage = () => {
  const stored = localStorage.getItem("todos");
  if (stored) {
    todos = JSON.parse(stored).map((todo) => ({
      ...todo,
      dueDateTime: new Date(todo.dueDateTime),
      createdAt: new Date(todo.createdAt),
    }));
  }
};

//Input Validation Interface
const ValidationErrors = {
  INVALID_INPUT: "Invalid input data provided",
  MISSING_TITLE: "Title is required",
  MISSING_DATE: "Due date is required",
  INVALID_DATE: "Invalid due date",
  INVALID_ID: "Invalid todo ID",
  EMPTY_UPDATES: "No updates provided",
};

// input Validation
const validateTodoData = ({ title, description, dueDateTime }) => {
  const errors = [];

  if (!title?.trim()) {
    errors.push(ValidationErrors.MISSING_TITLE);
  }

  if (!dueDateTime) {
    errors.push(ValidationErrors.MISSING_DATE);
  }

  if (dueDateTime && isNaN(new Date(dueDateTime).getTime())) {
    errors.push(ValidationErrors.INVALID_DATE);
  }

  if (description && typeof description !== "string") {
    errors.push("Description must be a string");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const createTodo = (todoData) => {
  try {
    const { title, description = "", dueDateTime } = todoData;

    const validation = validateTodoData({ title, description, dueDateTime });
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    const newTodo = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      dueDateTime: new Date(dueDateTime),
      completed: false,
      createdAt: new Date(),
    };

    todos.push(newTodo);
    saveToStorage();
    return newTodo;
  } catch (error) {
    throw new Error(`Failed to create todo: ${error.message}`);
  }
};

//Updated the function to include error handling
const updateTodo = (id, updates) => {
  try {
    if (!id) throw new Error(ValidationErrors.INVALID_ID);
    if (!updates || Object.keys(updates).length === 0) {
      throw new Error(ValidationErrors.EMPTY_UPDATES);
    }

    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) throw new Error("Todo not found");

    const { title, description, dueDateTime } = updates;

    todos[index] = {
      ...todos[index],
      ...updates,
      dueDateTime: dueDateTime
        ? new Date(dueDateTime)
        : todos[index].dueDateTime,
    };

    saveToStorage();
    renderTodos();
  } catch (error) {
    // Destructure the error object to get the message property
    showStatus(`Update failed: ${error.message}`, "error");
  }
};

//Updated the function to include error handling
const deleteTodo = (id) => {
  try {
    if (!id) throw new Error(ValidationErrors.INVALID_ID);

    const todoExists = todos.some((todo) => todo.id === id);
    if (!todoExists) throw new Error("Todo not found");

    if (!confirm("Delete this todo?")) return;

    todos = todos.filter((todo) => todo.id !== id);
    saveToStorage();
    renderTodos();
    showStatus("Todo deleted successfully");
  } catch (error) {
    showStatus(`Delete failed: ${error.message}`, "error");
  }
};

// UI functions
const createTodoElement = (todo) => {
  const isOverdue = !todo.completed && new Date(todo.dueDateTime) < new Date();
  const li = document.createElement("li");
  li.className = `todo-item ${todo.completed ? "completed" : ""} ${
    isOverdue ? "overdue" : ""
  }`;
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
        dueDateTime: form.elements[2].value,
      });
    };
    form.querySelector(".cancel").onclick = renderTodos;
  };

  li.querySelector(".delete").onclick = () => deleteTodo(todo.id);

  return li;
};

const showStatus = (message, type = "success") => {
  const status = document.getElementById("status-message");
  if (!status) return;
  
  status.textContent = message;
  status.className = `status-message show ${type}`;
  setTimeout(() => status.classList.remove("show"), 3000);
};

const renderTodos = () => {
  const list = document.getElementById("todo-list");
  const sortBy = document.getElementById("sort-select").value;
  const filterBy = document.getElementById("filter-select").value;

  let filteredTodos = [...todos];

 // Apply filter
if (filterBy === "active") {
    filteredTodos = filteredTodos.filter((todo) => !todo.completed);
}
if (filterBy === "completed") {
    filteredTodos = filteredTodos.filter((todo) => todo.completed);
}

// Apply sort
filteredTodos.sort((firstTodo, secondTodo) => {
    switch (sortBy) {
        case "due-asc":
            return firstTodo.dueDateTime - secondTodo.dueDateTime;
        case "due-desc":
            return secondTodo.dueDateTime - firstTodo.dueDateTime;
        case "created-asc":
            return firstTodo.createdAt - secondTodo.createdAt;
        case "created-desc":
            return secondTodo.createdAt - firstTodo.createdAt;
        default:
            return 0;
    }
});

  list.innerHTML = "";
  filteredTodos.forEach((todo) => list.appendChild(createTodoElement(todo)));
};

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();

  document.getElementById("todo-form").onsubmit = (e) => {
    e.preventDefault();
    try {
      const { title, description, dueDateTime } = e.target.elements;

      createTodo({
        title: title.value,
        description: description.value,
        dueDateTime: dueDateTime.value,
      });

      e.target.reset();
      renderTodos();
      showStatus("Todo added successfully!");
    } catch (error) {
      showStatus(error.message, "error");
    }
  };

  document.getElementById("sort-select").onchange = renderTodos;
  document.getElementById("filter-select").onchange = renderTodos;

  renderTodos();
});
