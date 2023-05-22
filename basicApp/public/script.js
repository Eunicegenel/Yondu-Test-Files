const tasksElement = document.getElementById('tasks');

function displayTasks(tasks) {
  tasksElement.innerHTML = '';
  
  if (tasks.length === 0) {
    tasksElement.innerHTML = '<p>No tasks found.</p>';
  } else {
    const ul = document.createElement('ul');
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${task.title}</strong>: ${task.description}`;
      ul.appendChild(li);
    });
    tasksElement.appendChild(ul);
  }
}

fetch('/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ tasks { id, title, description } }' }),
})
  .then(response => response.json())
  .then(data => displayTasks(data.data.tasks))
  .catch(error => console.error(error));
