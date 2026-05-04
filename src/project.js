  // project.js/    
  // create a project/ delete a project/ edit a project
  //   function createProject
  //   function removeProject
  //   function editProject
  // project(include tasks) save to localStorage 


export class Project {
  constructor(title, id) {
    this.title = title;
    this.id = crypto.randomUUID();
  }
}