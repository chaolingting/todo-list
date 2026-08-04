//localStorage
import { Project } from "./project";
import { Todo } from "./todo";
import { getTodos, getProjects, setTodos, setProjects } from "./dataManager";



export function saveTodos() {
  const saveTodoArray = getTodos();
  const saveProjectArray = getProjects();

  localStorage.setItem('todoarray', JSON.stringify(saveTodoArray));
  console.log("資料已存入:", localStorage.getItem('todoarray'));


  localStorage.setItem('projectarray', JSON.stringify(saveProjectArray));
  console.log("saved:", localStorage.getItem('projectarray'));


}

export function loadTodos() {
  const savedTodos = localStorage.getItem('todoarray');
  const savedProjects = localStorage.getItem('projectarray');

  if(savedProjects) {
    const rawProjects = JSON.parse(savedProjects);

    const loadedProjects = rawProjects.map(p => {
      const proj = new Project(p.title);
      proj.id = p.id;
      proj.todoIds = p.todoIds || [];
      return proj;
    });
    setProjects(loadedProjects);
  }

  if(savedTodos) {
    const rawTodos = JSON.parse(savedTodos);

    const loadedTodos = rawTodos.map(t => {
      return new Todo (
        t.title,
        t.duetime,
        t.dueFromNow,
        t.note,
        t.project,
        t.id,
        t.priority,
        t.completed
      );
    });

    setTodos(loadedTodos);
  }

}