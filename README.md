# todo-list

default task first screen

add new task
  form: task title, task due time(date-fns), task note, belong to which project(if not then it's default) completed or not, priority, id
  can add, delete or edit
add new project
  form: project title, project id, tasks array





logic
  todo.js/
  class todo object(title, duetime, note, project, id, priority, completed)
    create a task(and select a project/or default)/ delete a task/ edit a task
      function createTask(title, taskduetime, tasknote, projectselection, id, priority, completed)
      function removeTask(taskid, remove)
      function editTask(taskId, updateTask)

  project.js/    
  create a project/ delete a project/ edit a project
    function createProject
    function removeProject
    function editProject
  project(include tasks) save to localStorage 
  

screen
  screen.js/
    render task 
      function renderTask(title, duetime, note, projectselection, priority, completed)
    render project
      function renderProject(title, tasks array)
    show previous project & task
      set localStorage


save to localStorage
  localStorage.js
    save projects to localstorage


index 
  connect all
