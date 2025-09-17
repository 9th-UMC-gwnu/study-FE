"use strict";
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-Form");
const todoList = document.getElementById("todo-List");
const doneList = document.getElementById("done-List");
let todos = [];
let doneTask = [];
const renderTask = () => {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach((todo) => {
        const li = creatTOdoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTask.forEach((todo) => {
        const li = creatTOdoElement(todo, true);
        doneList.appendChild(li);
    });
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = "";
    renderTask();
};
const compltTask = (todo) => {
    todos = todos.filter((t) => t.id != todo.id);
    doneTask.push(todo);
    renderTask();
};
const deleteTodo = (todo) => {
    doneTask = doneTask.filter((t) => t.id !== todo.id);
    renderTask();
};
const creatTOdoElement = (todo, isDOne) => {
    const li = document.createElement("li");
    li.classList.add("render-container__item");
    li.textContent = todo.text;
    const button = document.createElement("button");
    button.classList.add("render-container__item-btn");
    if (isDOne) {
        button.textContent = "삭제";
        button.style.backgroundColor = "#007bff";
    }
    else {
        button.textContent = "완료";
        button.style.backgroundColor = "#28a745";
    }
    button.addEventListener("click", () => {
        if (isDOne) {
            deleteTodo(todo);
        }
        else {
            compltTask(todo);
        }
    });
    li.appendChild(button);
    return li;
};
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
renderTask();
