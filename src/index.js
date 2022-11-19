import './index.css';
/* eslint-disable import/no-cycle */
import { showToDoTasks } from './modules/task-show.js';


// Initial References
export const inputNewTasks = document.querySelector('#sect__one__cont__items__item__one input');

// Disable Edit Button
export const buttonsDeactive = (bool) => {
  const buttonModify = document.getElementsByClassName('edit__btn');
  Array.from(buttonModify).forEach((element) => {
    element.disabled = bool;
  });
};
showToDoTasks();