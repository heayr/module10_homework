// Задание 2.

// Сверстайте кнопку, клик на которую будет выводить данные 
// о размерах экрана с помощью alert. 



const btn = document.querySelector('.size');
const windowWidth = window.screen.width;
const windowHeight = window.screen.height;

function handlerWindow() {
  alert(`Screen Size: Width: ${windowWidth} Height: ${windowHeight} `);
  console.log('btn click');
}

btn.addEventListener('click', handlerWindow)