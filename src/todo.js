import { formatDistance, subDays, parseISO } from "date-fns";
import Project from "./project";

export default class Todo {
  
  constructor(title, date, note, isCompleted = false){
    this.title = title;
    this.date = parseISO(date);
    this.note = note;
    this.isCompleted = isCompleted;
    this.id = crypto.randomUUID();

  }

  checkCompleted() {
      this.isCompleted = !this.isCompleted;
  }


}

