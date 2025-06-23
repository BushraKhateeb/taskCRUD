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
  const deleteDoneBtn = document.querySelector('.deleteDone');
  const deleteAllBtn = document.querySelector('.deleteAll');
  const showAllBtn = document.querySelector('.filterBtn button:nth-child(1)');
  const showCompletedBtn = document.querySelector('.filterBtn button:nth-child(2)');
  const showUncompletedBtn = document.querySelector('.filterBtn button:nth-child(3)');

  let taskToDelete = null;
  let taskToEdit = null;

  const saveTasksToLocalStorage = () => {
    const tasks = Array.from(taskList.children).map(li => {
      return {
        text: li.querySelector('span').textContent,
        completed: li.classList.contains('completed')
      };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const loadTasksFromLocalStorage = () => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      const tasks = JSON.parse(stored);
      tasks.forEach(task => addTask(task.text, task.completed));
    }
  };

  const toggleEmptyState = () => {
    noTasks.style.display = taskList.children.length === 0 ? 'block' : 'none';
  };

  const addTask = (text = '', completed = false) => {
    const taskText = text || todoInput.value;
    if (!taskText || Array.from(taskList.children).some(li => li.querySelector('span').textContent === taskText)) return;

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

      deleteDoneBtn.disabled = Array.from(taskList.children).every(li => !li.classList.contains('completed'));
      saveTasksToLocalStorage();
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

    deleteAllBtn.disabled = false;
    deleteDoneBtn.disabled = Array.from(taskList.children).every(li => !li.classList.contains('completed'));

    saveTasksToLocalStorage();
  };

  addBtn.addEventListener('click', () => addTask());
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  confirmDeleteBtn.addEventListener('click', () => {
    if (taskToDelete) {
      taskToDelete.remove();
      toggleEmptyState();
      saveTasksToLocalStorage();
    }
    modal.classList.add('hidden');
    taskToDelete = null;

    deleteAllBtn.disabled = taskList.children.length === 0;
    deleteDoneBtn.disabled = Array.from(taskList.children).every(li => !li.classList.contains('completed'));
  });

  cancelDeleteBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    taskToDelete = null;
  });

  saveEditBtn.addEventListener('click', () => {
    if (taskToEdit) {
      taskToEdit.textContent = editInput.value;
      editModal.classList.add('hidden');
      taskToEdit = null;
      saveTasksToLocalStorage();
    }
  });

  cancelEditBtn.addEventListener('click', () => {
    editModal.classList.add('hidden');
    taskToEdit = null;
  });

  deleteDoneBtn.addEventListener('click', () => {
    const tasks = Array.from(taskList.children);
    tasks.forEach(li => {
      if (li.classList.contains('completed')) li.remove();
    });
    toggleEmptyState();
    deleteDoneBtn.disabled = true;
    deleteAllBtn.disabled = taskList.children.length === 0;
    saveTasksToLocalStorage();
  });

  deleteAllBtn.addEventListener('click', () => {
    taskList.innerHTML = '';
    toggleEmptyState();
    deleteAllBtn.disabled = true;
    deleteDoneBtn.disabled = true;
    saveTasksToLocalStorage();
  });

  loadTasksFromLocalStorage();
});
