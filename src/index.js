import './index.css';
import Todotasks from './modules/task.js';
import Interact from './modules/interact.js';
import {
  newTaskForm, newEditTaskForm, newTaskFromInput, newEditTaskFormInput,
} from './modules/Variables.js';

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