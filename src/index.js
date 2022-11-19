import './index.css';
import { DateTime } from './modules/luxon.js';
/* eslint-disable import/no-cycle */
import { showToDoTasks } from './modules/task_show.js';

const time = document.getElementById('time');
// Initial References
export const inputNewTasks = document.querySelector('#sect__one__cont__items__item__one input');

const now = DateTime.now();
time.innerHTML = `Date:[${now.day}-${now.month}-${now.year}] | Time:[${now.hour}:${now.minute}:${now.second}]`;
// Disable Edit Button
export const buttonsDeactive = (bool) => {
  const buttonModify = document.getElementsByClassName('edit__btn');
  Array.from(buttonModify).forEach((element) => {
    element.disabled = bool;
  });
};
showToDoTasks();