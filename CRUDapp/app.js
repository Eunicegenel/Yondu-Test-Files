// Data Form
const todoForm = document.getElementById('todo_form');
const todoTitle = document.getElementById('todo_title');
const todoContent = document.getElementById('todo_content');
const todoList = document.getElementById('todo_list');

todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', handleTodoClick);

function addTodo(e) {
  e.preventDefault();
  const title = todoTitle.value;
  todoTitle.value = '';
  const content = todoContent.value;
  todoContent.value = '';
  const query = `
    mutation {
      addTodo(title: "${title}", content: "${content}") {
        id
        title
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
      const newTitle = prompt('Enter new title for the todo item');
      const newContent = prompt('Enter new content for the todo item');
      if (newContent) {
        const query = `
          mutation {
            editTodo(id: ${todoId}, title: "${newTitle}", content: "${newContent}") {
              id
              title
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
        title
        content
      }
    }
  `;
  graphqlRequest(query, displayTodos);
}

function displayTodos(data) {
  todoList.innerHTML = data.todos.map(todo => `
    <li class="todo_list_data">
      <div class="todo_data">
        <b>${todo.title}</b><br><br>
        ${todo.content}
      </div>
      <div class="todo_btns">
        <button data-button-type="delete" data-todo-id="${todo.id}">Delete</button>
        <button data-button-type="edit" data-todo-id="${todo.id}">Edit</button>
      </div>
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


// Quote API
const quoteDisplay = document.getElementById('quote_display');
const quoteAuthor = document.getElementById('quote_author');

async function updateQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();

    quoteDisplay.textContent = `${data.content}`;
    quoteAuthor.textContent = `-${data.author}`;

    // Remove the 'quote-visible' class and add it back after a short delay to restart the CSS transition
    quoteDisplay.classList.remove('quote_visible');
    quoteAuthor.classList.remove('quote_visible');
    setTimeout(() => quoteDisplay.classList.add('quote_visible'), 50);
    setTimeout(() => quoteAuthor.classList.add('quote_visible'), 50);
  } catch (err) {
    console.error('Failed to fetch quote:', err);
  }
}

// Update the quote immediately and then every 10-15 seconds
updateQuote();
setInterval(updateQuote, Math.random() * 5000 + 10000);
