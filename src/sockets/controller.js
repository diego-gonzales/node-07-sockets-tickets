import { TicketControl } from '../models/ticket-control.js';

const ticketControl = new TicketControl();

export const socketController = (socket) => {
  socket.emit('last-ticket-number', ticketControl.last);
  socket.emit('actual-status', ticketControl.lastFourTickets);
  socket.emit('in-queue', ticketControl.tickets.length);

  socket.on('generate-new-ticket', (_, callback) => {
    const newTicket = ticketControl.generateNewTicket();
    callback(newTicket);
    socket.broadcast.emit('in-queue', ticketControl.tickets.length);
  });

  socket.on('dispatch-next-ticket', (payload, callback) => {
    const { cashier } = payload;
    if (!cashier) {
      callback({
        ok: false,
        message: 'The cashier is required',
      });
    }

    const ticket = ticketControl.dispatchTicket(cashier);

    socket.broadcast.emit('actual-status', ticketControl.lastFourTickets);
    socket.emit('in-queue', ticketControl.tickets.length);
    socket.broadcast.emit('in-queue', ticketControl.tickets.length);

    !ticket
      ? callback({ ok: false, message: 'There is no more tickets' })
      : callback({ ok: true, ticket, inQueue: ticketControl.tickets.length });
  });
};
