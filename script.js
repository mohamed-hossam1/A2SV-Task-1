"use strict";

const add_button = document.getElementById('add-btn');
const input_element = document.getElementById('todo-input');
const todo_list = document.querySelector('.todo-list');

let todoCounter = 0;

const addTask = (taskText) => {
  const item_element = document.createElement('div');
  item_element.classList.add(`item-${todoCounter}`, 'item');
  item_element.innerHTML = `
    <h2>${taskText}</h2>
    <div id="icons">
      <i id='update-${todoCounter}' class="fa-solid fa-pen-to-square"></i>
      <i id='delete-${todoCounter}' class="fa-solid fa-trash"></i>
    </div>
  `;
  todo_list.appendChild(item_element);
  
  const delete_button = document.getElementById(`delete-${todoCounter}`);
  const update_button = document.getElementById(`update-${todoCounter}`);
  const iconsDiv = item_element.querySelector('#icons');
  
  delete_button.addEventListener("click", () => {
    todo_list.removeChild(item_element);
  });
  
  update_button.addEventListener("click", () => {
    const h2 = item_element.querySelector('h2');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskText;
    input.className = 'edit-input';
    
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.className = 'update-confirm-btn';
    
    h2.replaceWith(input);
    iconsDiv.replaceWith(updateBtn);
    
    updateBtn.addEventListener("click", () => {
      const newText = input.value.trim();
      if (newText) {
        h2.textContent = newText;
        input.replaceWith(h2);
        taskText = newText;
        updateBtn.replaceWith(iconsDiv);
      }
    });
    
  });

  todoCounter++;
  input_element.value = '';
};

add_button.addEventListener("click", () => {
  const taskText = input_element.value.trim();
  if (taskText) addTask(taskText);
});

const todos = ["Do some homeworks", "Play some games", "Go to gym"];
const setup = () => {
  todos.forEach(taskText => {
    addTask(taskText);
  });
};

setup();