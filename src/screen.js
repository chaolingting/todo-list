// UI
import Todo from "./todo.js";
import Project from "./project.js";


export default class Screen {
  constructor(todoList, projectList) {
    this.todoList = todoList;
    this.taskList = document.querySelector('.task-list');
    this.taskFormContainer = document.querySelector('.task-form');
    this.form = document.querySelector('.item');


    this.projectList = projectList;
    this.projectFormContainer = document.querySelector('.project-form');
    this.pjtForm = document.querySelector('.project')
 
    this.init();
  
  }

  init() {
    this.createTodos();
    this.createProjects();
  }

  //TODO ---- create new todos 
  createTodos() {

    const taskBtn = document.querySelector('.task-btn');
    const taskForm = document.querySelector('.task-form');
    const closeBtn = document.querySelector('.close-btn');


    taskBtn.addEventListener('click', () => {
      taskForm.classList.add('active');
    })

    closeBtn.addEventListener('click', () => {
      taskForm.classList.remove('active');
    })

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitForm();
    })

  }

  submitForm() {

      const title = document.querySelector('#title').value;
      const date = document.querySelector('#date').value;
      const note = document.querySelector('#note').value;
      const checkCompleted = document.querySelector('#complete-or-not').checked;

      const todo = new Todo(title, date, note, checkCompleted);
      this.todoList.add(todo);
      this.renderTodo(todo);

      // this.taskForm.classList.remove('active');
      this.form.reset();

    }

  renderTodo(todo) {
      const li = document.createElement('li');
      li.dataset.id = todo.id;
      li.textContent = `${todo.title} (Due Date: ${todo.date}) ${todo.note} `;
      if (todo.isCompleted) {
        li.style.textDecoration = 'line-through';
      }
    //delete
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "delete";
      deleteBtn.addEventListener('click', ()=> {
        this.todoList.remove(todo.id);
        li.remove();
      })
    //done
      const doneBtn = document.createElement('button');
      doneBtn.textContent = 'done';
      doneBtn.addEventListener('click', () => {
        todo.checkCompleted();
        this.todoList.save();
        li.style.textDecoration = todo.isCompleted ? 'line-through' : 'none';
      })

      li.append(deleteBtn, doneBtn);
      this.taskList.append(li);

  }


//PROJECT
    createProjects() {

      const projectBtn = document.querySelector('.project-btn');
      // const projectForm = document.querySelector('.project-form');
      // const pjtForm = document.querySelector('.project');
      

      projectBtn.addEventListener('click', () => {
        this.projectFormContainer.classList.add('active');
      })

     this.pjtForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitProjectForm();
      })


    }

    submitProjectForm() {

      const pjtName = document.querySelector('#pjt-name').value;
      const pjtDate = document.querySelector('#pjt-date').value;
      const pjtNote = document.querySelector('#pjt-note').value;
      const newProject = new Project(pjtName, pjtDate, pjtNote);

      console.log(pjtName, pjtDate, pjtNote);


      this.projectList.add(newProject);
      this.renderProject(newProject);

      this.projectFormContainer.classList.remove('active');
      this.pjtForm.reset();

      }

      renderProject(project) {
        const projectBox = document.querySelector('.project-box');
        const projectLi = document.createElement('li');
        projectLi.className = 'project-item';
        projectLi.textContent = `${project.name}, ${project.date}, ${project.note}`


        projectBox.append(projectLi);

      }




}



