//save project list

export default class projectList {
  constructor(){
    this.projects = JSON.parse(localStorage.getItem('newProject')) || [];
  }

  add(project) {
    this.projects.push(project);
    this.save();
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