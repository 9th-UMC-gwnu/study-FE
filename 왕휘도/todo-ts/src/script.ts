const todoInput = document.getElementById("todo-input") as HTMLAnchorElement;
const todoIForm = document.getElementById("todo-Form") as HTMLAnchorElement;
const todoList = document.getElementById("todo-List") as HTMLAnchorElement;
const doneList = document.getElementById("done-List") as HTMLAnchorElement;

type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTask: Todo[] = [];

const renderTask = (): void => {
  todoList.innerHTML = "";
  todoList.innerHTML = "";
  todoList.innerHTML = "";
};
