const h1Label = document.querySelector('h1');
const btnAttendTicket = document.querySelector('button');
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('cashier')) {
  window.location = 'index.html';
  throw new Error('The cashier is required');
}

const currentCashier = searchParams.get('cashier');
h1Label.innerText = `Cashier ${currentCashier}`;

const socket = io();

socket.on('connect', () => {
  btnAttendTicket.disabled = false;
});

socket.on('disconnect', () => {
  btnAttendTicket.disabled = true;
});

document.addEventListener('click', () => {
  socket.emit('dispatch-next-ticket', { cashier: currentCashier }, (resp) => {
    console.log(resp);
  });
});
