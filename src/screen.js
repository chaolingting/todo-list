    // render task 
    //   function renderTask(title, duetime, note, projectselection, priority, completed)
    // render project
    //   function renderProject(title, tasks array)
    // show previous project & task
    //   set localStorage

import { createTodo, getTodos, createProject, getProjects, removeTodo, removeProject, updateTodo, getProjectNamebyId } from "./dataManager";
import { Todo } from "./todo";
import { Project } from "./project";


const todoListContainer = document.querySelector('.todolist');
const projectContainer = document.querySelector('.project-container');
const projectSelectionOption = document.querySelector('#select-project');

export function createTodoElement(todo) {
    const todoLi = document.createElement('li');
  
    const checkboxStatus = todo.completed ? "Done" : "Not yet";
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.checked = todo.completed;
    checkboxInput.addEventListener('click', ()=>{
      updateTodo(todo.id, {completed:checkboxInput.checked
      })
      renderTodoList();
      renderProject();
    })
    

    const projectName = getProjectNamebyId(todo.project);

    //remove todo
    const removeTodoBtn = document.createElement('button');
    removeTodoBtn.classList.add('remove-btn');
    // removeTodoBtn.textContent = 'remove';
    removeTodoBtn.addEventListener('click', ()=>{
      removeTodo(todo.id);
      renderTodoList();
      renderProject();
    })
    //edit todo
    const editTodoBtn = document.createElement('button');
    // editTodoBtn.textContent = 'edit';
    editTodoBtn.classList.add('edit-btn')
    editTodoBtn.addEventListener('click', () => {
      editTodo(todo.id);
    })


    const btns = document.createElement('div');

    //show todo li
    // todoLi.textContent = `${todo.title} Due date: ${todo.dueFromNow} ${todo.duetime} Note: ${todo.note} Project: ${projectName} Priority: ${todo.priority} Completed? ${checkboxStatus} `

    const fields = [
      { label:'', value: todo.title, className: 'title'},
      { label:'Due:', value:`${todo.dueFromNow}`, className: 'due-from-now'},
      { label:'', value: todo.duetime, className:'duetime' },
      { label:'Note: ', value: todo.note, className: 'note' },
      { label:'Project: ', value: projectName, className: 'project-title'},
      { label:'Priority: ', value: todo.priority, className:'priority'},
      { label:'Status: ', value: checkboxStatus, className:'checkbox'},
    ];

    const spans = fields.map(field => {
      const span = document.createElement('span');
      span.textContent = `${field.label}${field.value}`;

      if(field.className) span.classList.add(field.className);

      return span;
    })
    
      const detailSpan = spans.slice(1);
      detailSpan.forEach(span => 
        span.classList.add('hidden'));

      spans[0].addEventListener('click', () => {
        detailSpan.forEach(span => span.classList.toggle('hidden'));
        
      });

    todoLi.classList.add('todo-spans');
    btns.classList.add('btns')
    todoLi.append(checkboxInput, ...spans);
    btns.append(removeTodoBtn, editTodoBtn);
    todoLi.append(btns);


    if (todo.completed == true || checkboxInput.checked ) {
      todoLi.classList.add('cross');

    }

    return todoLi;
}


//render todo
export function renderTodoList() {
  todoListContainer.innerHTML = "";

  const todos = getTodos();

  todos.forEach(todo =>{
    todoListContainer.appendChild(createTodoElement(todo))
    console.log(`SHOW ${todo.title}`);
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
  projectSelectionOption.innerHTML = '<option value=""> --Choose a Project-- </option>';

  const projects = getProjects();

  projects.forEach(project => {
    const option = document.createElement('option');
    

    option.textContent = project.title;
    option.value = project.id;

    projectSelectionOption.appendChild(option)
  })
}

//render project
export function renderProject() {
  // projectContainer.innerHTML = "";
  const sections = projectContainer.querySelectorAll('.project-section');
  sections.forEach(s => s.remove());

  const projects = getProjects();
  const allTodos = getTodos();

  projects.forEach(project => {
    console.log(project instanceof Project);


    const projectSection = document.createElement('div')
    const projectTitle = document.createElement('h3');

    projectSection.classList.add('project-section');
    projectTitle.textContent = project.title;

    //remove
    const removeProjectBtn = document.createElement('button');
    removeProjectBtn.textContent = 'remove'
    removeProjectBtn.addEventListener('click', ()=> {
      removeProject(project.id);
      renderProject();
      renderTodoList();
      renderProjectOption();
    })

    //edit project
    const editProjectBtn = document.createElement('button');
    editProjectBtn.textContent = 'edit';
    editProjectBtn.addEventListener('click', () => {
      editProject(project.id)
      console.log(`update ${project.id}`)
    })
 
    const projectList = document.createElement('ul');
    const filteredTodos = allTodos.filter(todo => todo.project === project.id);

    filteredTodos.forEach(todo => {
      const todoElement = createTodoElement(todo);

      projectList.append(todoElement);
    })
    
    projectSection.append(projectTitle, projectList, removeProjectBtn, editProjectBtn);
    projectContainer.append(projectSection)



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