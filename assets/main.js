document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todoInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');
  const noTasks = document.getElementById('noTasks');

  const modal = document.getElementById('confirmModal');
  const confirmDeleteBtn = document.getElementById('confirmDelete');
  const cancelDeleteBtn = document.getElementById('cancelDelete');

  let taskToDelete = null; 

  const toggleEmptyState = () => {
    noTasks.style.display = taskList.children.length === 0 ? 'block' : 'none';
  };

  const addTask = (event) => {
    event.preventDefault();

    const taskText = todoInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${taskText}</span>
      <div class="taskBtn">
        <input type="checkbox" class="checkbox">
        <button class="editBtn"><i class="fa-solid fa-pen"></i></button>
        <button class="deleteBtn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    // عند الضغط على زر الحذف
    li.querySelector('.deleteBtn').addEventListener('click', () => {
      taskToDelete = li;
      modal.classList.remove('hidden');
    });

    taskList.appendChild(li);
    todoInput.value = '';
    toggleEmptyState();
  };

  addBtn.addEventListener('click', addTask);
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask(e);
  });

  // عشان يحذف
  confirmDeleteBtn.addEventListener('click', () => {
    if (taskToDelete) {
      taskToDelete.remove();
      toggleEmptyState();
    }
    modal.classList.add('hidden');
    taskToDelete = null;
  });

  // عشان يلغي الحذف
  cancelDeleteBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    taskToDelete = null;
  });
});
