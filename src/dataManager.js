import { Todo } from "./todo.js"
import { Project } from "./project.js"

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

}

export function updateTodo(id, updateData) {
  const index = todoArray.findIndex(todo => todo.id === id);
  if(index !== -1){
    todoArray[index] = { ...todoArray[index], ...updateData};
    return todoArray[index];
  }

  console.log(`update: ${id}`)
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
  const index = projectArray.findIndex(project => project.id === id);
  if(index !== -1){
    projectArray[index] = {...projectArray[index], ...updateData};
    return projectArray[index]
  }
}

//GROUP
