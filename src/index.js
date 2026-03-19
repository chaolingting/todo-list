// src/index.js
import "./styles.css";
import Screen from "./screen.js";
import Todo from "./todo.js";
import saveTodoList from "./saveTodoList.js";
import Project from "./project.js";

// 測試用的
// console.log(greeting);
// import odinImage from "./odin.png";
// const image = document.createElement("img");
// image.src = odinImage;
// image.width = 100;
// document.body.appendChild(image);


const todoList = new saveTodoList();
const projectList = new Project();
const screen = new Screen(todoList, projectList);


