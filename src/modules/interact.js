import Todotasks from './task.js';

export default class Interact {
static toggleCompleted = (id, curentstatus) => {
  const taskList = Todotasks.getFromLocalStorag();
  taskList[id].completed = curentstatus;
  Todotasks.setToLocalStorage(taskList);
  Todotasks.displayTaskItems();
}

static addCheckEvent = () => {
  document.querySelectorAll('.checkbox').forEach((box) => box.addEventListener('change', () => {
    let id;
    let curentstatus;
    if (box.id > 0) {
      id = box.id - 1;
    } else {
      id = 0;
    }

    if (box.checked === true) {
      curentstatus = true;
    } else if (box.checked !== true) {
      curentstatus = false;
    }

    this.toggleCompleted(id, curentstatus);
  }));
};

static deleteAllCompleted = () => {
  let taskList = Todotasks.getFromLocalStorag();

  taskList = taskList.filter((element) => element.completed !== true);
  Todotasks.reassignId(taskList);
  Todotasks.setToLocalStorage(taskList);
  Todotasks.displayTaskItems();
}
}