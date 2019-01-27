
// Fetch existing todos from localStorage

const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')


    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

// Save todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = filters.hideCompleted == false || todo.completed == false;

        return searchTextMatch && hideCompletedMatch;
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Remove Todos From List
const removeTodos = function (id) {
    const removeIndex = todos.findIndex(todo => todo.id === id);

    if (removeIndex > -1) {
        todos.splice(removeIndex, 1);
    }
}

// Get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
    debugger
  const todoEl = document.createElement('div');
  const checkbox = document.createElement('input');
  const todoTxt = document.createElement('span');
  const removeButton = document.createElement('button');

  // Setup Todo checkbox
  checkbox.setAttribute('type','checkbox');
  todoEl.appendChild(checkbox);

  // Setup Todo Text
  todoTxt.textContent = todo.text;
  todoEl.appendChild(todoTxt);

  // Setup Todo Button
  removeButton.textContent = 'x';
  todoEl.appendChild(removeButton);

  removeButton.addEventListener('click', () => {
      debugger;
    removeTodos(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  })
  return todoEl;
}

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}