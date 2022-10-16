console.log('hi, module 10 started');

// Задание 1.

// Сверстайте кнопку, которая будет содержать в себе
//  icon_01 (как в примере в последнем видео).
//  При клике на кнопку иконка должна меняться на icon_02.
//  Повторный клик меняет иконку обратно.

// ================================================================================

const button = document.querySelector('.btn');



button.addEventListener('click', () => {
  button.classList.toggle('btn_toggle');
  console.log('cliked');
})
// ================================================================================

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

// ================================================================================
// Задание 3.

// Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

// Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:

// img
// Добавить в чат механизм отправки гео-локации:
// img
// При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку
//  на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const wsUri = "wss://echo-ws-service.herokuapp.com";
// Перестала работать, ночью работала, сейчас утром вообще 0 реакции, даже с VPN

const wsUri = "wss://ws.ifelse.io";
const btnLocate = document.querySelector('.btn_geo');


function pageLoaded() {
  const infoOutput = document.querySelector('.info_output');
  const chatOutput = document.querySelector('.chat_output');
  const input = document.querySelector('input')
  const sendBtn = document.querySelector('.btn_send');

  let socket = new WebSocket(wsUri);

  socket.onopen = () => {
    infoOutput.innerText = 'Connection is ok';
  }

  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }

  socket.onerror = () => {
    infoOutput.innerText = 'While sending data there was an error';

  }

  sendBtn.addEventListener('click', sendMessage);

  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === '';

  }

  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class='${isRecieved ? 'recieved' : 'sent'}' >${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }


  function getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError);

    } else {
      writeOutput('Your browser doesn\'t support geolocation')
    }
  }

  function locationSuccess(data) {
    console.log(data);
    let link = `https://www.openstreetmap.org/#map=9/${data.coords.latitude}/${data.coords.longitude}`;

    writeOutput(`<a class='recieved recieved_link' href='${link}' target='blank'>You are here</a>`);
  }

  function locationError() {
    writeOutput('When tried to locate your position error accured ');
  }

  function writeOutput(message) {
    chatOutput.innerHTML += `<p>${message}</p>`

  }

  btnLocate.addEventListener('click', getLocation);
}
document.addEventListener('DOMContentLoaded', pageLoaded);