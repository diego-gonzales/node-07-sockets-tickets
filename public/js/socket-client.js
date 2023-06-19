const socket = io();
const lblConnected = document.querySelector('#statusConnected');
const lblDisconnected = document.querySelector('#statusDisconnected');
const messageInput = document.querySelector('.messageInput');
const sendButton = document.querySelector('.sendButton');

socket.on('connect', () => {
  console.log('Connected to server');
  lblConnected.style.display = '';
  lblDisconnected.style.display = 'none';
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
  lblConnected.style.display = 'none';
  lblDisconnected.style.display = '';
});

socket.on('send-message-server', (payload) => {
  console.log(payload);
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value;

  const payload = {
    message,
    id: socket.id,
    date: new Date().getTime(),
  };

  socket.emit('send-message-client', payload, (info) => {
    console.log('Server response:', info);
  });
});
