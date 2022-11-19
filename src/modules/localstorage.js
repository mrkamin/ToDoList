/* eslint-disable import/no-cycle */
import { showToDoTasks } from './task-show.js';
// Remove Task from local storage
export const deleteTask = (taskValue) => {
  localStorage.removeItem(taskValue);
  showToDoTasks();
};
// Add tasks to local storage
export const storageUpdate = (index, taskValue, completedTask) => {
  localStorage.setItem(`${index}_${taskValue}`, completedTask);
  showToDoTasks();
};
