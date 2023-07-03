const lblNewTicket = document.querySelector('#lblNewTicket');
const btnGenerateNewTicket = document.querySelector('button');
const socket = io();

socket.on('connect', () => {
  console.log('Connected');
  btnGenerateNewTicket.disabled = false;
});

socket.on('disconnect', () => {
  console.log('Disconnected');
  btnGenerateNewTicket.disabled = true;
});

socket.on('last-ticket-number', (lastTicketNumber) => {
  lblNewTicket.innerText = `Ticket ${lastTicketNumber}`;
});

btnGenerateNewTicket.addEventListener('click', () => {
  socket.emit('generate-new-ticket', null, (resp) => {
    lblNewTicket.innerText = resp;
  });
});
