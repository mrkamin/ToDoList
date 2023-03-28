import './index.css';

/* eslint-disable import/no-cycle */
/* import { showToDoTasks } from './modules/task-show.js'; */
import Todotasks from './modules/task.js';
import Interact from './modules/interact.js';
import {
  newTaskForm, newEditTaskForm, newTaskFromInput, newEditTaskFormInput,
} from './modules/Variables.js';

// Initial References
export const inputNewTasks = document.querySelector('#sect__one__cont__items__item__one input');

// Disable Edit Button
export const buttonsDeactive = (bool) => {
  const buttonModify = document.getElementsByClassName('edit__btn');
  Array.from(buttonModify).forEach((element) => {
    element.disabled = bool;
  });
};
/* showToDoTasks(); */

newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  Todotasks.addTask(newTaskFromInput.value);
  newTaskFromInput.value = '';
});

newEditTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = Number(newEditTaskFormInput.getAttribute('id'));
  Todotasks.updateTask(newEditTaskFormInput.value, id);
  newEditTaskFormInput.value = '';
  document.getElementById('add__task__input').style.display = 'block';
  newEditTaskForm.style.display = 'none';
});

document.querySelector('.del__all__task').addEventListener('click', Interact.deleteAllCompleted);

window.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('updateList', () => {
    Interact.addCheckEvent();
  }, false);
  Todotasks.displayTaskItems();
});
