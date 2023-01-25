const form = document.querySelector("[data-form]");
const list = document.querySelector("[data-list]");
const input = document.querySelector("[data-input]");

class Storage {
  static addToStorage(todoArr) {
    let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
    return storage;
  }
  static getLocalStorage() {
    let storage =
      localStorage.getItem("todo") == null
        ? []
        : JSON.parse(localStorage.getItem("todo"));
    return storage;
  }
}

let todoArr = Storage.getLocalStorage();
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let id = Math.random() * 100000;
  const todo = new Todo(id, input.value);
  todoArr = [...todoArr, todo];
  UI.displayData();
  UI.clearInput();
  UI.removeTodo();
  Storage.addToStorage(todoArr);
});

class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}

class UI {
  static displayData() {
    let displayData = todoArr.map((item) => {
      return `
                <div class="todolist">
                        <p class="text">${item.todo}</p>
                        <ion-icon name="trash-outline" class="remove" data-id = ${item.id}></ion-icon>
                </div>
            `;
    });
    list.innerHTML = displayData.join(" ");
  }
  static clearInput() {
    input.value = "";
  }
  static removeTodo() {
    list.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
      }
      let btnId = e.target.dataset.id;
      UI.removeTodoArray(btnId);
    });
  }
  static removeTodoArray(id) {
    todoArr = todoArr.filter((item) => item.id !== +id);

    Storage.addToStorage(todoArr);
  }
}
window.addEventListener("DOMContentLoaded", () => {
  UI.displayData();
  UI.removeTodo();
});
