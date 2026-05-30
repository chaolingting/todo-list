import { Todo } from "./todo.js"
import { Project } from "./project.js"
import { saveTodos } from "./localStorage.js";


const todoArray = [];
const projectArray = [];


//TODO
export function createTodo(data) {
  const newTodo = new Todo(
    data.title,
    data.duetime,
    data.dueFromNow,
    data.note,
    data.project,
    data.id,
    data.priority,
    data.completed
  )

  todoArray.push(newTodo);

//add to target project
  const targetProject = projectArray.find(p => p.id === data.project)

  if(targetProject) {
    targetProject.addTodosId(newTodo.id);
    console.log(`add todo to ${targetProject.title}`)
  }

  saveTodos();
  return newTodo;
}

export function getTodos() {
  return todoArray
}


export function removeTodo(id) {
  const index = todoArray.findIndex(todo => todo.id === id);

  if (index === -1 ) {
    console.warn(`cant find ${id}`);
    return;
  }

  todoArray.splice(index, 1);
  console.log(`deleted ${id}`);

  saveTodos();
}

export function updateTodo(id, updateData) {
  // const index = todoArray.findIndex(todo => todo.id === id);
  // if(index !== -1){
  //   todoArray[index] = { ...todoArray[index], ...updateData};
  //   return todoArray[index];
  // }

  const target = todoArray.find(todo => todo.id === id);
  if (target) {
    Object.assign(target, updateData);
    return target;
  }

  console.log(`update: ${id}`)

  saveTodos();
}



//PROJECT
export function createProject(pdata) {
  const newProject = new Project(
    pdata.title,
    pdata.id
  )

  projectArray.push(newProject);
  return newProject;
}


export function getProjects() {
  return projectArray
}

export function getProjectNamebyId(id) {
  const target = projectArray.find(p => p.id === id);
  return target ? target.title : "";
}


export function removeProject(id) {
  const index = projectArray.findIndex(project => project.id === id);

  if (index === -1) {
    console.warn(`cant find ${id}`);
    return;
  }

  projectArray.splice(index, 1);
  console.log(`deleted ${id}`)
}

export function updateProject(id, updateData) {
  // const index = projectArray.findIndex(project => project.id === id);
  // if(index !== -1){
  //   projectArray[index] = {...projectArray[index], ...updateData};
  //   return projectArray[index]
  // }
  const target = projectArray.find(project => project.id === id);
  if (target) {
    Object.assign(target, updateData);
    return target;
  }
}

//GROUP
