//save todo list
import Todo from "./todo";
import Screen from "./screen";

export default class saveTodoList {
  constructor(){
    this.todos = JSON.parse(localStorage.getItem('newTodos')) || [];
  }

  add(todo) {
    this.todos.push(todo);
    this.save();
  }

  remove(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
  }

  save() {
    localStorage.setItem('newTodos', JSON.stringify(this.todos));
  }
}

//還沒有學會先不做 等做好project再回來看