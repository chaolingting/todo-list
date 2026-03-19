import { formatDistance, subDays, parseISO } from "date-fns";


export default class Project {

  constructor(name, date, todos, note) {
    this.name = name;
    this.date = parseISO(date);
    this.todos = [];
    this.id = crypto.randomUUID();
    this.note = note;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

}