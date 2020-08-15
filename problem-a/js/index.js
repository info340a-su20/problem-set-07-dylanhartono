'use strict';

/* your code goes here! */
class Task {
  constructor(stringDesc, isCompleted) {
    this.description = stringDesc;
    this.complete = isCompleted;
  }

  render() {
    let li = document.createElement("li");
    li.textContent = this.description;
    if(this.complete) {
      li.classList.add('font-strike');
    }

    // Arrow Function keeps "this"
    li.addEventListener('click', () => {
      this.toggleFinished();
      li.classList.toggle('font-strike');
    })

    return li;
  }

  toggleFinished() {
    this.complete = !this.complete;
  }
}

// 3
class TaskList {
  constructor(taskList) {
    this.tasks = taskList; // array
  }

  addTask(descrString) {
    let newTask = new Task(descrString, false);
    this.tasks.push(newTask);
  }

  render() {
    let ol = document.createElement('ol');
    this.tasks.forEach((aTask) => {
      let task = aTask.render();
      ol.appendChild(task);
    })
    return ol;
  }
}

class NewTaskForm {
  constructor(submitWhere) {
    this.submitCallback = submitWhere;
  }

  render() {
    let form = document.createElement('form');

    // children
    let input = document.createElement('input');
    input.classList.add('form-control', 'mb-3');
    input.setAttribute('placeholder', "What else do you have to do?");
    form.appendChild(input);

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-primary');
    button.textContent = "Add task to list";

    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.submitCallback(input.value);
    })

    form.appendChild(button);

    return form;
  }
}

class App {
  constructor(parent, taskList) {
    this.parent = parent;
    this.taskList = taskList;
  }

  render() {
    let list = this.taskList.render();
    this.parent.appendChild(list);

    let addTask = (arg) => this.addTaskToList(arg);
    let taskForm = new NewTaskForm(addTask);
    this.parent.appendChild(taskForm.render());
  }

  addTaskToList(descString) {
    this.taskList.addTask(descString);
    this.parent.innerHTML = "";
    this.render(); // rerender!
  }
}

let aTask = new Task("Make some classes", true);
let bTask = new Task("Arrow some functions", false);
let taskListObj = new TaskList([aTask, bTask]);

let app = document.querySelector('#app');
let appObj = new App(app, taskListObj);
appObj.render();




//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
