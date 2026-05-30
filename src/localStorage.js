//localStorage
import { Project } from "./project";
import { Todo } from "./todo";
import { getTodos, getProjects } from "./dataManager";



export function saveTodos() {
  const saveTodoArray = getTodos();

localStorage.setItem('todoarray', JSON.stringify(saveTodoArray))
console.log("資料已存入:", localStorage.getItem('todoarray'));


}