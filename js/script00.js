const input = document.querySelector('#input');
const btnAdd = document.querySelector('#btnAdd');
const sortAll = document.querySelector('#sortAll');
const sortDone = document.querySelector('#sortDone');
const btnTodo = document.querySelector('#sortTodo');
const btnComplet = document.querySelector('#btnComplet');
const delite = document.querySelector('#delite');
const todoСounter = document.querySelector('#todoСounter');
const completedСounter = document.querySelector('#completedСounter');
const list = document.querySelector('#list'); //!____________test

const test = document.querySelectorAll('.sortTodo .right button'); //!____________test

const date = new Date();
let arrSortTodo = [];
let todos;
let todoItemElems = [];
!localStorage.todos ? todos = [] : todos = JSON.parse(localStorage.getItem('todos')); //! Добавление в LS

const updateLocal = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
}; //! Для слушателя добавить Todo 


const addTodo = () => {
  if (input.value == '') {
    return null;
  }

  todos.push({
    title: input.value,
    date: Date.now(),
    completed: false
  });
  input.value = '';
  showList();
  counter();
  updateLocal();
}; //! отрисовка елемента


const createElement = (item, index) => {
  return `<li class="${item.completed ? 'checked' : ''}">
         <div class="left">
            <div class='line'>
            <p class='counter'>${index + 1}.</p>
                <p>${item.title}</p>
                 <b>${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}</b>
             </div>
         </div>
         <div class="right">
         <button onclick='renameTask(${index})'>Rename</button>
            <button onclick='completedTask(${index})'>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
   <circle cx="20" cy="20" r="20" fill="#E8E8E8" />
   <rect x="11.7418" y="21.3969" width="4" height="12.2744" rx="2" transform="rotate(-40.8464 11.7418 21.3969)"
      fill="#097928" />
   <rect x="26.5342" y="10.3166" width="4" height="20" rx="2" transform="rotate(26.7027 26.5342 10.3166)"
      fill="#097928" />
</svg></button>
            <button onclick = 'deliteTask(${index})'>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="20" fill="#E8E8E8"/>
<rect x="25.6569" y="11.5147" width="4" height="20" rx="2" transform="rotate(45 25.6569 11.5147)" fill="#CD0F0F"/>
<rect x="11.5147" y="14.3431" width="4" height="20" rx="2" transform="rotate(-45 11.5147 14.3431)" fill="#CD0F0F"/>
</svg>
</button>
         </div>
      </li>`;
}; //! Добавление списка


const showList = () => {
  list.innerHTML = '';
  todos.forEach((item, index) => {
    if (todos.length > 0) {
      list.innerHTML += createElement(item, index);
    }

    todoItemElems = list.querySelectorAll('li');
  }); //!________________test

  test.forEach(item => {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    }
  });
  test[0].classList.add('active'); //!________________test
}; //! Удаление


const deliteTask = index => {
  todoItemElems[index].classList.add('remove');
  setTimeout(() => {
    todos.splice(index, 1);
    showList();
    counter();
    updateLocal();
  }, 600);
}; //! завершение


const completedTask = index => {
  todos[index].completed = !todos[index].completed;
  counter();
  showList();
  updateLocal();
}; //! изменить название таски


const renameTask = index => {
  let newTitle = prompt('Изменить на');

  if (newTitle === '') {
    return null;
  }

  todos[index].title = newTitle;
  showList();
  updateLocal();
}; //! Счетчик


const counter = () => {
  const counterCompleted = todos.filter(item => item.completed);
  const conterTodo = todos.filter(item => !item.completed);
  completedСounter.innerHTML = counterCompleted.length;
  todoСounter.innerHTML = conterTodo.length;
}; //! Показать завершенные


const showDone = () => {
  list.innerHTML = '';
  const fill = todos.filter(item => {
    if (item.completed) {
      return item;
    }
  });
  arrSortTodo = fill.map((item, index) => {
    list.innerHTML += createElement(item, index);
  }); //!________________test

  test.forEach(item => {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    }
  });
  test[1].classList.add('active'); //!________________test
}; //!Показать НЕзавершенные


const sortTodo = () => {
  list.innerHTML = '';
  const fill = todos.filter((item, index) => {
    if (!item.completed) {
      return item;
    }
  });
  arrSortTodo = fill.map((item, index) => {
    list.innerHTML += createElement(item, index);
  }); //!________________test

  test.forEach(item => {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    }
  });
  test[2].classList.add('active'); //!________________test
};

sortAll.addEventListener('click', showList);
sortDone.addEventListener('click', showDone);
btnTodo.addEventListener('click', sortTodo);
counter();
showList();
//# sourceMappingURL=script00.js.map
