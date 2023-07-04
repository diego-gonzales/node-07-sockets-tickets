const labelTicket1 = document.querySelector('#lblTicket1');
const labelCashier1 = document.querySelector('#lblEscritorio1');

const labelTicket2 = document.querySelector('#lblTicket2');
const labelCashier2 = document.querySelector('#lblEscritorio2');

const labelTicket3 = document.querySelector('#lblTicket3');
const labelCashier3 = document.querySelector('#lblEscritorio3');

const labelTicket4 = document.querySelector('#lblTicket4');
const labelCashier4 = document.querySelector('#lblEscritorio4');

const socket = io();

socket.on('actual-status', (payload) => {
  const [ticket1, ticket2, ticket3, ticket4] = payload;

  if (!ticket1 || !ticket2 || !ticket3 || !ticket4) return;

  labelTicket1.innerText = `Ticket ${ticket1.number}`;
  labelCashier1.innerText = `Cashier ${ticket1.cashier}`;

  labelTicket2.innerText = `Ticket ${ticket2.number}`;
  labelCashier2.innerText = `Cashier ${ticket2.cashier}`;

  labelTicket3.innerText = `Ticket ${ticket3.number}`;
  labelCashier3.innerText = `Cashier ${ticket3.cashier}`;

  labelTicket4.innerText = `Ticket ${ticket4.number}`;
  labelCashier4.innerText = `Cashier ${ticket4.cashier}`;
});
