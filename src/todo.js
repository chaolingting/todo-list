  // todo.js/
  // class todo object(title, duetime, note, project, id, priority, completed)
  //   create a task(and select a project/or default)/ delete a task/ edit a task
  //     function createTask(title, taskduetime, tasknote, projectselection, id, priority, completed)
  //     function removeTask(taskid, remove)
  //     function editTask(taskId, updateTask)
import{ formatDistance } from "date-fns"


export class Todo {
  constructor(title, duetime, dueFromNow, note, project, id, priority, completed = false) {
    this.title = title;
    this.duetime = duetime;

    if(duetime && !isNaN(new Date(duetime).getTime())){
      this.dueFromNow = formatDistance(new Date(duetime), new Date(), { addSuffix: true });
    } else {
      this.dueFromNow = "";
    }

    this.note = note;
    this.project = project;
    this.id = crypto.randomUUID();
    this.priority = priority;
    this.completed = completed;
  }


  }

   