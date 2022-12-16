
import Interact from './interact.js'

describe('Togglecomplet', () => {
beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.setItem.mockClear();
    document.body.innerHTML = '<div class="sect__one__cont__item2">'
            + '<li></li>'
            + '</div>';

            const object = { description: 'Test the todo task', completed: false, index: 1 };
            window.localStorage.setItem('taskList', JSON.stringify([object]));
});

test('Toggleing function for changeing the complete status', () => {

    /* Arrange And Act */

    const id = 0;
    const curentstatus = true;
    const toggleSpy = jest.spyOn(Interact, 'toggleCompleted');
    Interact.toggleCompleted(id, curentstatus);

    /* Assert */

    expect(toggleSpy).toHaveBeenCalledTimes(1);
    const result = JSON.parse(window.localStorage.getItem('taskList'))[id].completed;
    expect(result).toBe(true);
});


test('Toggleing function for changeing the completed status twice', () => {
    // Arrange and Act
    const id = 0;
    const curentstatus = true;
    const toggleSpy = jest.spyOn(Interact, 'toggleCompleted');
    Interact.toggleCompleted(id, curentstatus);

    // Assert
    expect(toggleSpy).toHaveBeenCalledTimes(1);
    const result = JSON.parse(window.localStorage.getItem('taskList'))[id].completed;
    expect(result).toBe(true);

    Interact.toggleCompleted(id, false);
    // Assert
    expect(toggleSpy).toHaveBeenCalledTimes(2);
    const result2 = JSON.parse(window.localStorage.getItem('taskList'))[id]
      .completed;
    expect(result2).toBe(false);
  });
});

describe('delete all completed status task', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.setItem.mockClear();
    document.body.innerHTML = '<div class="sect__one__cont__item2">'
    + '<li></li>'
    + '</div>';
    const obj = { description: 'Testing task one', completed: false, index: 1 };
    const obj2 = { description: 'Second task testing', completed: true, index: 2 };
    const obj3 = { description: 'thesting object 3', completed: false, index: 3 };
    const obj4 = { description: 'Todo task number four', completed: true, index: 4 };
    window.localStorage.setItem('taskList', JSON.stringify([obj, obj2, obj3, obj4]));
  });
  test('delete all current completed expected to clear 2 tasks-', () => {
    // Arrange and Act

    const deleteCompletedTasksSpy = jest.spyOn(Interact, 'deleteAllCompleted');
    Interact.deleteAllCompleted();

    // Assert
    expect(deleteCompletedTasksSpy).toHaveBeenCalledTimes(1);
    const result = JSON.parse(window.localStorage.getItem('taskList'));
    expect(result).toHaveLength(2);
  });

  test('Editing description', () => {
    // Arrange and Act
    const deleteCompletedTasksSpy = jest.spyOn(Interact, 'deleteAllCompleted');
    const taskList = JSON.parse(window.localStorage.getItem('taskList'));
    // Interactive.deleteAllCompleted();

    taskList.forEach((item) => { item.completed = true; });
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    Interact.deleteAllCompleted();

    // Assert
    expect(deleteCompletedTasksSpy).toHaveBeenCalledTimes(1);
    const result = JSON.parse(window.localStorage.getItem('taskList'));
    expect(result).toHaveLength(0);
  });
});
