

import Todo from './task.js'

describe('Add new Todo', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
        localStorage.setItem.mockClear();
        document.body.innerHTML = `
            <div class="sect__one__cont__item2 newClass">
            <li></li>
            </div> `;
      });
    test('Add a new object to local storage', () => {
        const object = {
            description: 'JS jest practic test',
            index: 1,
            completed: false,
        };

        Todo.addTask(object.description);
        const result = Todo.getFromLocalStorag();

        expect(result.length).toBe(1);
         // eslint-disable-next-line no-underscore-dangle
    expect(localStorage.__STORE__.taskList).toBe(JSON.stringify([object]));
    });

    test('Add a second object to local storage', () => {
        const object = { description: 'JS jest Practis test', index: 1, completed: false };
        Todo.addTask(object.description);
    
        const result = Todo.getFromLocalStorag();
    
        expect(result.length).toBe(1);
        expect(localStorage.setItem).toHaveBeenLastCalledWith(
          'taskList',
          JSON.stringify([object]),
        );
      });
    
      test('Adding new task to the UI', () => {
        const div = document.querySelectorAll('.sect__one__cont__item2');
        Todo.addTask('Testing the code');
        expect(div).toHaveLength(1);
      });
    });

    describe('delete List element', () => {
        beforeEach(() => {
            localStorage.clear();
            jest.clearAllMocks();
            localStorage.setItem.mockClear();
            document.body.innerHTML = '<div class="sect__one__cont__item2">'
            + '<li></li>'
            + '</div>';
            const object = { description: 'Testing todo task', completed: false, index: 1 };
            Todo.setToLocalStorage([object]);
        });

        test('Deleteing todo task from local storage', () => {
            const id = 0;

            Todo.delTask(id);
            const result = Todo.getFromLocalStorag();
            expect(result.length).toBe(0);
            // eslint-disable-next-line no-underscore-dangle
            expect(localStorage.__STORE__.taskList).toBe(JSON.stringify([]));
        });
    });


   