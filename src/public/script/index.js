//public/script/index.js
const socket = io();

socket.on('connect', () => {
    console.log('Usted es el socket con id: ' + socket.id);
});

socket.on('nuevoUsuario', (newUserId) => {
    console.log('Se conecto un nuevo usuario con id: ' + newUserId);
});

let user = '';

//Loguaerse
const loginForm = document.getElementById('login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const loginInput = document.getElementById('loginInput');
    const username = loginInput.value;

    if (username.trim().length > 0) {
        user = username;
        socket.emit('login', username);
        loginForm.querySelectorAll('input, button').forEach((element) => {
            element.disabled = true;
        });
        document.getElementById('loginMessage').innerText = `Bienvenido: ${user}`;
        const chatDiv = document.getElementById('chat');
        chatDiv.removeAttribute('hidden');
    }
});

// Enviar mensajes al servidor
const chatForm = document.querySelector('#chatForm');
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputMessage = document.querySelector('#inputMessage');
    const message = inputMessage.value;

    if (message.trim() !== '') {
        inputMessage.value = '';
        socket.emit('newMessage', { user, message, date: new Date().toISOString() });
    }
});

// Función para agregar un mensaje a la lista de mensajes
function addMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    const userDiv = document.createElement('div');
    userDiv.classList.add('userName');
    userDiv.textContent = message.user;
    messageDiv.appendChild(userDiv);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    dateDiv.textContent = new Date(message.date).toLocaleString();
    messageDiv.appendChild(dateDiv);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    contentDiv.textContent = message.message;
    messageDiv.appendChild(contentDiv);

    const messagesList = document.querySelector('#messages');
    messagesList.appendChild(messageDiv);
    messagesList.scrollTop = messagesList.scrollHeight;
}

function newUser(user) {
    const newUserDiv = document.createElement('div');
    newUserDiv.classList.add('newUser');
    newUserDiv.textContent = `El usuario ${user} se conectó`;

    const messagesList = document.querySelector('#messages');
    messagesList.appendChild(newUserDiv);
    messagesList.scrollTop = messagesList.scrollHeight;
}

function userLeaves(user) {
    const newUserDiv = document.createElement('div');
    newUserDiv.classList.add('newUser');
    newUserDiv.textContent = `El usuario ${user} se desconectó`;

    const messagesList = document.querySelector('#messages');
    messagesList.appendChild(newUserDiv);
    messagesList.scrollTop = messagesList.scrollHeight;
}

socket.on('chat', (chat) => {
    chat.forEach((message) => addMessage(message));
});

socket.on('addMessage', (message) => addMessage(message));

socket.on('newUser', (user) => newUser(user));

socket.on('userLeave', (user) => userLeaves(user));
