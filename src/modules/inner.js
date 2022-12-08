/* ========================================================= */

/* || InnerHtml */
export const newSectOne = document.querySelector('#sect__one');
newSectOne.innerHTML = `
<div class="sect__one__cont">
<div class="heading">
  <h1>Today's To Do</h1>
  <i class="fa-solid fa-sync"></i>
</div>
<div class="sect__one__cont__item1">
  <form action="" method="post" id="add__task__form">
    <div class="task__form__input">
      <input
        type="text"
        name="todo"
        id="add__task__input"
        placeholder="Add a task to your list..."
        required
      />
    </div>
  </form>
  <form action="" method="post" id="edit__task__form">
    <div class="task__form__input">
      <input
        type="text"
        name="todo"
        id=""
        class="edit__task__input"
        placeholder="Edit your task..."
        required
      />
    </div>
  </form>
</div>
<div class="sect__one__cont__item2"></div>
<div class="delete">
  <h3 class="del__all__task">Clear all completed</h3>
</div>
</div>`;
/* ========================================================= */