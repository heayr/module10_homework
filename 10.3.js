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





// внизу, черновая логика геолокации



// https://yandex.ru/maps/?ll=30.310182,59.951059&z=12&l=map

// function pageLoaded() {
//   let btn = document.querySelector('.btn_send');
//   let output = document.querySelector('.output');


//   function getLocation() {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(locationSuccess, locationError);

//     } else {
//       writeOutput('Your browser doesn\'t support geolocation')
//     }
//   }

//   function locationSuccess(data) {
//     console.log(data);
//     let link = `https:yandex.ru/maps/?ll=${data.coords.longitude},${data.coords.latitude}&z=12&l=map`;
//     writeOutput(`<a href='${link}' target='blank'>You are here</a>`);
//   }

//   function locationError() {
//     writeOutput('When tried to loacte your position error accrued ');
//   }

//   function writeOutput(message) {
//     output.innerHTML = `<p>${message}</p>`

//   }
//   btn.addEventListener('click', getLocation);

// }

// document.addEventListener('DOMContentLoaded', pageLoaded);