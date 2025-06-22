document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todoInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');
  const noTasks = document.getElementById('noTasks');

  const modal = document.getElementById('confirmModal');
  const confirmDeleteBtn = document.getElementById('confirmDelete');
  const cancelDeleteBtn = document.getElementById('cancelDelete');

  const editModal = document.getElementById('editModal');
  const editInput = document.getElementById('editInput');
  const saveEditBtn = document.getElementById('saveEdit');
  const cancelEditBtn = document.getElementById('cancelEdit');

  let taskToDelete = null;
  let taskToEdit = null;

  const toggleEmptyState = () => {
    noTasks.style.display = taskList.children.length === 0 ? 'block' : 'none';
  };

  const addTask = (text = '', completed = false) => {
    const taskText = text || todoInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${taskText}</span>
      <div class="taskBtn">
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
        <button class="editBtn"><i class="fa-solid fa-pen"></i></button>
        <button class="deleteBtn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    const checkbox = li.querySelector('.checkbox');
    const editBtn = li.querySelector('.editBtn');
    const deleteBtn = li.querySelector('.deleteBtn');
    const taskSpan = li.querySelector('span');

    if (completed) {
      li.classList.add('completed');
      editBtn.disabled = true;
      editBtn.style.opacity = '0.5';
      editBtn.style.pointerEvents = 'none';
    }

    checkbox.addEventListener('change', () => {
      const isChecked = checkbox.checked;
      li.classList.toggle('completed', isChecked);
      editBtn.disabled = isChecked;
      editBtn.style.opacity = isChecked ? '0.5' : '1';
      editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
    });

    deleteBtn.addEventListener('click', () => {
      taskToDelete = li;
      modal.classList.remove('hidden');
    });

    editBtn.addEventListener('click', () => {
      if (!checkbox.checked) {
        taskToEdit = taskSpan;
        editInput.value = taskSpan.textContent;
        editModal.classList.remove('hidden');
      }
    });

    taskList.appendChild(li);
    todoInput.value = '';
    toggleEmptyState();
  };

  addBtn.addEventListener('click', () => addTask());
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  confirmDeleteBtn.addEventListener('click', () => {
    if (taskToDelete) {
      taskToDelete.remove();
      toggleEmptyState();
    }
    modal.classList.add('hidden');
    taskToDelete = null;
  });

  cancelDeleteBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    taskToDelete = null;
  });


  saveEditBtn.addEventListener('click', () => {
    if (taskToEdit) {
      taskToEdit.textContent = editInput.value.trim();
      editModal.classList.add('hidden');
      taskToEdit = null;
    }
  });

  cancelEditBtn.addEventListener('click', () => {
    editModal.classList.add('hidden');
    taskToEdit = null;
  });
});
