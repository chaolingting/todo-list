import { createTodo, getTodos, createProject, getProjects, removeTodo, removeProject, updateTodo, getProjectNamebyId } from "./dataManager";
import { Todo } from "./todo";
import { Project } from "./project";


const todoListContainer = document.querySelector('.todolist');
const projectContainer = document.querySelector('.project-container');
const projectSelectionOption = document.querySelector('#select-project');

export function createTodoElement(todo) {
    const todoLi = document.createElement('li');
    const spansDivs = document.createElement('div');
  
    const checkboxStatus = todo.completed ? "Done" : "On going";
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.classList.add('checkbox');
    checkboxInput.checked = todo.completed;
    checkboxInput.addEventListener('click', ()=>{
      updateTodo(todo.id, {completed:checkboxInput.checked
      })
      renderTodoList();
      renderProject();
    })
    
    const todoTitle = document.createElement('h4');
    todoTitle.textContent = todo.title;
    todoTitle.classList.add('title');

    const titleRow = document.createElement('div');
    titleRow.classList.add('title-row');
  



    const projectName = getProjectNamebyId(todo.project);

    //remove todo
    const removeTodoBtn = document.createElement('button');
    removeTodoBtn.classList.add('remove-btn');
    removeTodoBtn.textContent = 'Remove';
    removeTodoBtn.addEventListener('click', ()=>{
      removeTodo(todo.id);
      renderTodoList();
      renderProject();
    })
    //edit todo
    const editTodoBtn = document.createElement('button');
    editTodoBtn.textContent = 'Edit';
    editTodoBtn.classList.add('edit-btn')
    editTodoBtn.addEventListener('click', () => {
      editTodo(todo.id);
    })

    const details = document.createElement('div');
    details.classList.add('details', 'hidden')
    const btns = document.createElement('div');
    


    const priority = todo.priority || 'Low';

    const priorityTag = document.createElement('div');
    priorityTag.classList.add('priority-tag');
    priorityTag.textContent = todo.priority;
    priorityTag.classList.add(`priority-${todo.priority.toLowerCase()}`);
  



    const fields = [
      { label:'Time ', value:`${todo.dueFromNow}`, className: 'due-from-now'},
      { label:'Date', value: todo.duetime, className:'duetime' },
      { label:'Project ', value: projectName, className: 'project-title'},
      { label:'Priority ', value: todo.priority, className:'priority'},
      { label:'Status ', value: checkboxStatus, className:'checkbox'},
      { label:'Note ', value: todo.note, className: 'note' }

    ];

    const spans = fields.map(field => {
      const span = document.createElement('span');
      span.classList.add('detail-spans')

      if (field.label) {
        const labelEl = document.createElement('span');
        labelEl.textContent = field.label;
        labelEl.classList.add('field-label');
        span.appendChild(labelEl);
      }

      const valueEl = document.createElement('span');
      valueEl.textContent = field.value;
      valueEl.classList.add('field-value');
      span.appendChild(valueEl);
      // span.textContent = `${field.label}${field.value}`;

      if(field.className) span.classList.add(field.className);

      return span;
    })
    

    // spans.forEach(span => span.classList.add('hidden'));


    todoTitle.addEventListener('click', () => {
      // spans.forEach(span => span.classList.toggle('hidden'));
      // details.classList.toggle('hidden');
      // btns.classList.toggle('hidden')
      // details.classList.toggle('hidden');
      todoLi.classList.toggle('is-expanded');
      details.classList.remove('hidden')

    });

    todoLi.classList.add('todo-card');
    btns.classList.add('btns')


    titleRow.append(checkboxInput, todoTitle);
    todoTitle.append(priorityTag)
    details.append(...spans, btns);
    btns.append(removeTodoBtn, editTodoBtn);

    todoLi.append(titleRow, details);
    




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
    projectTitle.classList.add('project-title')

    projectSection.classList.add('project-section');
    projectTitle.textContent = project.title;


    //remove
    const removeProjectBtn = document.createElement('button');
    removeProjectBtn.textContent = 'Remove'
    removeProjectBtn.addEventListener('click', ()=> {
      removeProject(project.id);
      renderProject();
      renderTodoList();
      renderProjectOption();
    })

    //edit project
    const editProjectBtn = document.createElement('button');
    editProjectBtn.textContent = 'Edit';
    editProjectBtn.addEventListener('click', () => {
      editProject(project.id)
      console.log(`update ${project.id}`)
    })

    const projectBtns = document.createElement('div');
    projectBtns.classList.add('project-btns');
 
    const projectList = document.createElement('ul');
    const filteredTodos = allTodos.filter(todo => todo.project === project.id);

    filteredTodos.forEach(todo => {
      const todoElement = createTodoElement(todo);

      projectList.append(todoElement);
    })

    projectBtns.append(removeProjectBtn, editProjectBtn);
    projectSection.append(projectTitle, projectList, projectBtns);
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

  // new Date().toLocaleDateString();
  // const now = new Date();
  // now.toLocaleDateString('zh-TW', {
  //   hour12: false,
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit'
  // });

  // console.log(now)

  // const dateOnScreen = document.createElement('div');

const timeDisplay = document.querySelector('.time');
const dateDisplay = document.querySelector('.date');


function setDate() {
  const now = new Date();
  const second = String(now.getSeconds()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');

  const year = now.getFullYear();
  const month = now.getMonth() +1;
  const date = now.getDate();

  dateDisplay.textContent = `${date}/${month}/${year}`
  timeDisplay.textContent = `${hour}:${minute}`
}
setDate();

setInterval(setDate, 1000);

