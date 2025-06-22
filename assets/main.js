document.addEventListener('DOMContentLoaded',()=> {
const todoInput = document.getElementById('todoInput'); 
const addBtn = document.getElementById('addBtn'); 
const taskList = document.getElementById('taskList'); 
const noTasks = document.getElementById('noTasks');


const toggleEmptyState=()=>{ 
  noTasks.style.display = taskList.children.
  length === 0 ? 'block' : 'none';
} //عشان احذف كلمة no tasks when add new task


const addTask = (event) => { 
    event.preventDefault();

    const taskText= todoInput.value.trim() ;
    if(!taskText){
        return;
    } 
     const li= document.createElement('li'); 
      li.innerHTML = `
      <span>${taskText} </span> 
      <input type= "checkbox" class="checkbox"> 
      <div class="taskBtn"> 
      <button class="editBtn"><i class="fa-solid fa-pencil"></i></button> 
      <button class="deleteBtn"><i class="fa-solid fa-trash"></i></button>  
      </div> 
      `;

     
     taskList.appendChild(li); 
     todoInput.value = ''; 
     toggleEmptyState();
}; 

addBtn.addEventListener('click' , addTask);
todoInput.addEventListener('keypress', (e)=> {
    if(e.key === 'Enter'){
      addTask(e) ;
    }
})

});



