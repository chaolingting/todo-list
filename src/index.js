// src/index.js
import "./styles.css";
import { createProject, createTodo, removeTodo, updateTodo, updateProject } from "./dataManager";

import { renderTodoList, renderProject, renderProjectOption, editTodo } from "./screen.js"
import { saveTodos } from "./localStorage.js";

//Todo
const taskForm = document.querySelector('#task-input-form');
const projectForm = document.querySelector('#project-input-form');

const taskDialog = document.querySelector('#task-input');
const projectDialog = document.querySelector('#project-input')

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const editTodoId = document.getElementById('edit-todo-id').value;

  const data = {
    title: document.getElementById('task-title').value,
    duetime: document.getElementById('date').value,
    note: document.getElementById('note').value,
    project: document.getElementById('select-project').value,
    priority: document.querySelector('input[name="priority"]:checked')?.value,
    completed: document.getElementById('checkbox').checked

  };

  if(editTodoId) {
    updateTodo(editTodoId, data);
    console.log("update:", editTodoId)
  } else {
    const newTodo = createTodo(data);
    console.log("1. created:",newTodo)
  }



  renderTodoList();
  renderProject();
  taskForm.reset();
  document.getElementById('edit-todo-id').value = "";
  taskDialog.hidePopover();

})


//Project

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();


  const editProjectId = document.getElementById('edit-project-id').value;

  const pdata = {
    title: document.getElementById('project-title').value
  }

  if(editProjectId) {
    updateProject(editProjectId, pdata);
    console.log("update:", editProjectId)
  } else {
    const newProject = createProject(pdata);
    console.log("created:",newProject)
  }



  renderProject();
  renderProjectOption();

  projectForm.reset();
  projectDialog.hidePopover();
})

const defaultProject = createProject({
  title: "get groceries"
});

console.log(defaultProject);
renderProjectOption();


const defaultTodo = createTodo({
  title: "buy tissue paper",
  duetime: "2026-05-10",
  note: "",
  project: defaultProject.id,
  priority: "Low",
  completed: false
});



console.log(defaultTodo)
renderProject();
renderTodoList();

saveTodos();