const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', handleTodoClick);

function addTodo(e) {
  e.preventDefault();
  const content = todoInput.value;
  todoInput.value = '';
  const query = `
    mutation {
      addTodo(content: "${content}") {
        id
        content
      }
    }
  `;
  graphqlRequest(query, updateTodoList);
}

function handleTodoClick(e) {
  if (e.target.tagName.toLowerCase() === 'button') {
    const buttonType = e.target.dataset.buttonType;
    const todoId = parseInt(e.target.dataset.todoId, 10);
    if (buttonType === 'delete') {
      const query = `
        mutation {
          deleteTodo(id: ${todoId}) {
            id
          }
        }
      `;
      graphqlRequest(query, updateTodoList);
    } else if (buttonType === 'edit') {
      const newContent = prompt('Enter new content for the todo item');
      if (newContent) {
        const query = `
          mutation {
            editTodo(id: ${todoId}, content: "${newContent}") {
              id
              content
            }
          }
        `;
        graphqlRequest(query, updateTodoList);
      }
    }
  }
}

function updateTodoList() {
  const query = `
    query {
      todos {
        id
        content
      }
    }
  `;
  graphqlRequest(query, displayTodos);
}

function displayTodos(data) {
  todoList.innerHTML = data.todos.map(todo => `
    <li>
      ${todo.content}
      <button data-button-type="delete" data-todo-id="${todo.id}">Delete</button>
      <button data-button-type="edit" data-todo-id="${todo.id}">Edit</button>
    </li>
  `).join('');
}

function graphqlRequest(query, callback) {
  fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
    .then(res => res.json())
    .then(res => callback(res.data))
    .catch(console.error);
}

updateTodoList();

const quoteDisplay = document.getElementById('quote-display');

async function updateQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();

    quoteDisplay.textContent = `${data.content} - ${data.author}`;

    // Remove the 'quote-visible' class and add it back after a short delay to restart the CSS transition
    quoteDisplay.classList.remove('quote-visible');
    setTimeout(() => quoteDisplay.classList.add('quote-visible'), 50);
  } catch (err) {
    console.error('Failed to fetch quote:', err);
  }
}

// Update the quote immediately and then every 10-15 seconds
updateQuote();
setInterval(updateQuote, Math.random() * 5000 + 10000);
