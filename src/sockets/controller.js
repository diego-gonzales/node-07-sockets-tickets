import { TicketControl } from '../models/ticket-control.js';

const ticketControl = new TicketControl();

export const socketController = (socket) => {
  socket.emit('last-ticket-number', ticketControl.last);

  socket.on('generate-new-ticket', (_, callback) => {
    const newTicket = ticketControl.generateNewTicket();
    callback(newTicket);
  });
};
