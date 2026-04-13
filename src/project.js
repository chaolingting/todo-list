import { formatDistance, subDays, parseISO } from "date-fns";


export default class Project {

  constructor(name, note) {
    this.name = name;
    //this.date = formatDistance(date);
    this.note = note;
    this.todos = [];
    this.id = crypto.randomUUID();
    
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

}