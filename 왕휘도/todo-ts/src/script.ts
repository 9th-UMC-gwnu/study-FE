const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-Form") as HTMLFormElement;
const todoList = document.getElementById("todo-List") as HTMLUListElement;
const doneList = document.getElementById("done-List") as HTMLUListElement;

type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTask: Todo[] = [];

const renderTask = (): void => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo): void => {
    const li = creatTOdoElement(todo, false);
    todoList.appendChild(li);
  });

  doneTask.forEach((todo): void => {
    const li = creatTOdoElement(todo, true);
    doneList.appendChild(li);
  });
};

const getTodoText = (): string => {
  return todoInput.value.trim();
};

const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTask();
};

const compltTask = (todo: Todo): void => {
  todos = todos.filter((t): boolean => t.id != todo.id);
  doneTask.push(todo);
  renderTask();
};

const deleteTodo = (todo: Todo): void => {
  doneTask = doneTask.filter((t): boolean => t.id !== todo.id);
  renderTask();
};

const creatTOdoElement = (todo: Todo, isDOne: boolean): HTMLElement => {
  const li = document.createElement("li");
  li.classList.add("render-container__item");
  li.textContent = todo.text;

  const button = document.createElement("button");
  button.classList.add("render-container__item-btn");

  if (isDOne) {
    button.textContent = "삭제";
    button.style.backgroundColor = "#007bff";
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "#28a745";
  }
  button.addEventListener("click", (): void => {
    if (isDOne) {
      deleteTodo(todo);
    } else {
      compltTask(todo);
    }
  });
  li.appendChild(button);
  return li;
};

todoForm.addEventListener("submit", (event: Event): void => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});

renderTask();
