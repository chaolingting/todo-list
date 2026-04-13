import { format, parseISO } from "date-fns";
import Project from "./project";

export default class Todo {
  
  constructor(title, duedate, note, isCompleted = false, project){
    this.title = title;
    this.date = parseISO(duedate);
    this.note = note;
    this.isCompleted = isCompleted;
    this.id = crypto.randomUUID();
    this.project = project === "select-a-project" ? null : project;

  }

  checkCompleted() {
      this.isCompleted = !this.isCompleted;
  }

  getFormattedDate() {
    return format(this.date, 'MMM do, yyyy');
  }

}

