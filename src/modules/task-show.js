/* eslint-disable import/no-cycle */
import { deleteTask, storageUpdate } from './localstorage.js';
import { inputNewTasks, buttonsDeactive } from '../index.js';

export const toDoDivTask = document.getElementById('sect__one__cont__items__item__two');
const deletToDoTasks = document.querySelector('.item__three__btn__del');
let clearToDoTasks;
let modifyToDoTasks;
let counter;
let toDotasksupdate = '';

/* || FUNCTION TO DISPLAY THE TASKS */
export const showToDoTasks = () => {
  if (Object.keys(localStorage).length > 0) {
    toDoDivTask.style.display = 'inline-block';
  } else {
    toDoDivTask.style.display = 'none';
  }
  /* || Clear the tasks */
  toDoDivTask.innerHTML = '';
  /* || Fetch All The Keys in local storage */
  let toDoTasks = Object.keys(localStorage);
  toDoTasks = toDoTasks.sort();

  toDoTasks.forEach((key) => {
    /* || Get all values */
    const toDoValue = localStorage.getItem(key);

    const toDoInnerDiv = document.createElement('p');
    toDoInnerDiv.classList.add('p__cont__task');
    toDoInnerDiv.setAttribute('id', key);
    toDoInnerDiv.innerHTML = `<p id="todo__name">${key.split('_')[1]}</p>`;
    /* || localstorage would store boolean as string so we parse it to boolean back */
    const buttonModify = document.createElement('button');
    buttonModify.classList.add('edit__btn');
    buttonModify.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    if (!JSON.parse(toDoValue)) {
      buttonModify.style.visibility = 'visible';
    } else {
      buttonModify.style.visibility = 'hidden';
      toDoInnerDiv.classList.add('completedTask');
    }
    toDoInnerDiv.appendChild(buttonModify);
    toDoInnerDiv.innerHTML += '<button class="del__btn"><i class="fa-solid fa-trash"></i></button>';
    toDoDivTask.appendChild(toDoInnerDiv);
  });
  /* || tasks completed */
  toDoTasks = document.querySelectorAll('.p__cont__task');
  toDoTasks.forEach((element) => {
    element.onclick = () => {
      /*  || local storage update */
      if (element.classList.contains('completedTask')) {
        storageUpdate(element.id.split('_')[0], element.innerText, false);
      } else {
        storageUpdate(element.id.split('_')[0], element.innerText, true);
      }
    };
  });
  /* || Edit Tasks */
  modifyToDoTasks = document.getElementsByClassName('edit__btn');
  Array.from(modifyToDoTasks).forEach((element) => {
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      /* || disable other edit buttons when one task is being edited */
      buttonsDeactive(true);
      /* || update input value and remove div */
      const parentEl = element.parentElement;
      inputNewTasks.value = parentEl.querySelector('#todo__name').innerText;
      /* || set updateNote to the task that is being edited */
      toDotasksupdate = parentEl.id;
      /*  || remove task */
      parentEl.remove();
    });
  });
  /*   || Delete Tasks */
  clearToDoTasks = document.getElementsByClassName('del__btn');
  Array.from(clearToDoTasks).forEach((element) => {
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      /* || Delete from local storage and remove div */
      const parentEl = element.parentElement;
      deleteTask(parentEl.id);
      parentEl.remove();
      counter -= 1;
    });
  });
};
/* || clear all checked tasks */
deletToDoTasks.addEventListener('click', (e) => {
  counter = Object.keys(localStorage).length;
  e.stopPropagation();
  const tasks1 = document.querySelectorAll('.p__cont__task');
  tasks1.forEach((element) => {
    /* || local storage update */
    if (element.classList.contains('completedTask')) {
      deleteTask(element.id);
      element.remove();
      counter -= 1;
    }
  });
});

/* || Function on window load */
window.onload = () => {
  toDotasksupdate = '';
  counter = Object.keys(localStorage).length;
  showToDoTasks();
};
/* || Function To Add New Task */
document.getElementById('item__one__btn__push').addEventListener('click', () => {
  /* || Enable the edit button */
  buttonsDeactive(false);
  if (inputNewTasks.value.length === 0) {
    alert('Please Enter A Task');
  } else {
    /* || Store locally and display from local storage */
    if (toDotasksupdate === '') {
      /* || new task */
      storageUpdate(counter, inputNewTasks.value, false);
    } else {
      /* || update task */
      const conterExist = toDotasksupdate.split('_')[0];
      deleteTask(toDotasksupdate);
      storageUpdate(conterExist, inputNewTasks.value, false);
      toDotasksupdate = '';
    }
    counter += 1;
    inputNewTasks.value = '';
  }
});
