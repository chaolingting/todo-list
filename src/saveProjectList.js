//save project list
import Project from "./project.js"

export default class ProjectList {
  constructor(){
    const rawData = JSON.parse(localStorage.getItem('newProject')) || [];
    this.projects = rawData.map(data => {
    const project = new Project(data.name, data.note);
    project.todos = data.todos;
    project.id = data.id;
    return project;
  })
  }




  add(project) {
    this.projects.push(project);
    this.save();
  }

  findProject(name) {
    return this.projects.find(project => project.name === name);
  }

  remove(id) {
    this.projects = this.projects.filter(project => project.id !== id);
    this.save();
  }

  save() {
    localStorage.setItem('newProject', JSON.stringify(this.projects));
  }
}

//還沒有學會先不做 等做好project再回來看