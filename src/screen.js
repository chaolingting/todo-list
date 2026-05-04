    // render task 
    //   function renderTask(title, duetime, note, projectselection, priority, completed)
    // render project
    //   function renderProject(title, tasks array)
    // show previous project & task
    //   set localStorage

import { createTodo, getTodos, createProject, getProjects, removeTodo, removeProject, updateTodo } from "./dataManager";
import { Todo } from "./todo";
import { Project } from "./project";


const todoListContainer = document.querySelector('.todolist');
const projectContainer = document.querySelector('.project-container');
const projectSelectionOption = document.querySelector('#select-project');

//render todo
export function renderTodoList() {
  todoListContainer.innerHTML = "";

  const todos = getTodos();

  todos.forEach(todo =>{
    console.log(todo instanceof Todo);

    const todoLi = document.createElement('li');
    const checkboxStatus = todo.completed ? "Done" : "Not yet"
    //remove todo
    const removeTodoBtn = document.createElement('button');
    removeTodoBtn.textContent = 'Delete';
    removeTodoBtn.addEventListener('click', ()=>{
      removeTodo(todo.id);
      renderTodoList()
    })

    //edit todo
    const editTodoBtn = document.createElement('button');
    editTodoBtn.textContent = 'Edit';
    editTodoBtn.addEventListener('click', () => {
      editTodo(todo.id);
    })


    //show todo li
    todoLi.textContent = `${todo.title} ${todo.dueFromNow} ${todo.duetime} ${todo.note} ${todo.project} ${todo.priority} ${checkboxStatus} `

    todoLi.append(removeTodoBtn)
    todoLi.append(editTodoBtn)

    if (todo.completed == true) {
      todoLi.classList.add('cross')
    }

    todoListContainer.appendChild(todoLi)
  })
}

//edit todo

export function editTodo(todoId) {
  const todos = getTodos();
  const target = todos.find(t => t.id === todoId );

  if(target) {
    document.getElementById('task-title').value = target.title;
    document.getElementById('date').value = target.duetime;
    document.getElementById('note').value = target.note;
    document.getElementById('select-project').value = target.project;

    const hiddenId = document.getElementById('edit-todo-id');
    if(hiddenId) hiddenId.value = target.id;

    const priorityBtn = document.querySelector(`input[name="priority"][value="${target.priority}"]`);
    if(priorityBtn) priorityBtn.checked = true;

    document.getElementById('checkbox').checked = target.completed;

    const dialog = document.getElementById('task-input');
    dialog.showPopover();
  } 
}


//render project option
export function renderProjectOption() {
  projectSelectionOption.innerHTML = '<option value=""> Choose a Project </option><option value="default">None</option>';

  const projects = getProjects();

  projects.forEach(project => {
    const option = document.createElement('option');

    option.textContent = project.title;
    option.value = project.title;

    projectSelectionOption.appendChild(option)
  })
}

//render project
export function renderProject() {
  projectContainer.innerHTML = "";

  const projects = getProjects();

  projects.forEach(project => {
    console.log(project instanceof Project);

    const projectList = document.createElement('ul');
    const projectLi = document.createElement('li');

    //remove
    const removeProjectBtn = document.createElement('button');
    removeProjectBtn.textContent = 'Remove'
    removeProjectBtn.addEventListener('click', ()=> {
      removeProject(project.id);
      renderProject()
    })

    //edit project
    const editProjectBtn = document.createElement('button');
    editProjectBtn.textContent = 'edit';
    editProjectBtn.addEventListener('click', () => {
      editProject(project.id)
      console.log(`update ${project.id}`)
    })
 

    projectLi.textContent = `${project.title}`

    projectLi.append(editProjectBtn)
    projectLi.append(removeProjectBtn)
    
    projectContainer.append(projectList)
    projectList.append(projectLi)


  })
}

  export function editProject(projectId) {
    const projects = getProjects();
    const target = projects.find(t => t.id === projectId );

    if(target) {
      document.getElementById('project-title').value = target.title;

      const hiddenId = document.getElementById('edit-project-id');
      if(hiddenId) hiddenId.value = target.id;

      const dialog = document.getElementById('project-input');
      dialog.showPopover();
    } 
  
  }