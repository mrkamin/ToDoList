import Tasktodo from './tasktodo.js';

export default class Todotasks {
static setToLocalStorage = (todotask) => {
  const element = JSON.stringify(todotask);
  localStorage.setItem('taskList', element);
};

static getFromLocalStorag = () => {
  let taskList;

  if (JSON.parse(localStorage.getItem('taskList')) === null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem('taskList'));
  }

  return taskList;
};

static reassignId = (taskList) => {
  taskList.forEach((element, i) => {
    element.index = i + 1;
  });
}

static delTask = (id) => {
  let taskList = this.getFromLocalStorag();
  const elementToDel = taskList[id];

  taskList = taskList.filter((element) => element !== elementToDel);

  this.reassignId(taskList);
  this.setToLocalStorage(taskList);
};

static updateTask = (newDescription, id) => {
  const taskList = this.getFromLocalStorag();
  const elementToUpdate = taskList[id];

  taskList.forEach((element) => {
    if (element === elementToUpdate) {
      element.description = newDescription;
    }
  });

  this.setToLocalStorage(taskList);
  this.displayTaskItems();
};

static removeTask = () => {
  document.querySelectorAll('.trash__can').forEach((button) => button.addEventListener('click', (event) => {
    event.preventDefault();
    let id;
    if (button.id > 0) {
      id = button.id - 1;
    } else {
      id = 0;
    }
    this.delTask(id);
    this.displayTaskItems();
  }));
};

static editTask = (id) => {
  const taskList = this.getFromLocalStorag();
  const elementToEdit = taskList[id];

  document.getElementById('add__task__input').style.display = 'none';
  const editTaskInput = document.querySelector('.edit__task__input');
  editTaskInput.value = elementToEdit.description;
  editTaskInput.setAttribute('id', id);
  document.getElementById('edit__task__form').style.display = 'block';
  editTaskInput.focus();
}

static editTaskBtn = () => {
  document.querySelectorAll('.edit__btn').forEach((button) => button.addEventListener('click', (event) => {
    event.preventDefault();
    let id;
    if (button.id > 0) {
      id = button.id - 1;
    } else {
      id = 0;
    }

    this.editTask(id);
  }));
};

static dobleClickEditTask = () => {
  document.querySelectorAll('.element').forEach((element) => element.addEventListener('dblclick', (event) => {
    event.preventDefault();
    let id;
    if (element.id > 0) {
      id = element.id - 1;
    } else {
      id = 0;
    }
    this.editTask(id);
  }));
};

static creatHtmlElement = ({ description, index }, curentstatus, iscompleted) => {
  const div = document.createElement('div');
  div.className = 'task__item';
  div.innerHTML = `
      <div class="task__details">
      <input type="checkbox" id="${index}" name="" value="" class="checkbox" ${curentstatus}> <h3 id="${index}" class="element ${iscompleted}">${description}</h3> <i></i>
      </div>
      <div>
      <button class="edit__btn" id="${index}"><i class="fa-regular fa-pen-to-square"></i></button>
      <button class="trash__can" id="${index}"><i class="fa-solid fa-trash-can"></i></button>
      </div>
      `;

  return div;
}

static displayTaskItems = () => {
  const taskList = this.getFromLocalStorag();
  document.querySelector('.sect__one__cont__item2').innerHTML = '';
  taskList.forEach((element) => {
    let curentstatus;
    let iscompleted;
    if (element.completed === true) {
      curentstatus = 'checked';
      iscompleted = 'completed';
    } else {
      curentstatus = '';
      iscompleted = '';
    }
    document.querySelector('.sect__one__cont__item2').append(this.creatHtmlElement(element, curentstatus, iscompleted));
  });
  this.removeTask();
  this.editTaskBtn();
  this.dobleClickEditTask();

  const event = new Event('updateList');
  document.dispatchEvent(event);
}

static addTask = (description) => {
  const taskList = this.getFromLocalStorag();
  const index = taskList.length + 1;
  const newTaskElement = new Tasktodo(description, index);

  taskList.push(newTaskElement);
  this.setToLocalStorage(taskList);
  this.displayTaskItems();
};
}