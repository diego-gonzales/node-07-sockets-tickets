import path from 'path';
import dataMock from '../db/data.json' assert { type: 'json' };
import fs from 'fs';

const __dirname = path.resolve();

class Ticket {
  constructor(number, cashier) {
    this.number = number;
    this.cashier = cashier;
  }
}

export class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFourTickets = [];

    this.init();
  }

  get dataToJson() {
    return {
      today: this.today,
      tickets: this.tickets,
      last: this.last,
      lastFourTickets: this.lastFourTickets,
    };
  }

  init() {
    const { today, tickets, last, lastFourTickets } = dataMock;
    if (today === this.today) {
      this.tickets = tickets;
      this.last = last;
      this.lastFourTickets = lastFourTickets;
    } else {
      this.saveDataInDb();
    }
  }

  saveDataInDb() {
    // const { pathname: dataPath } = new URL('../db/data.json', import.meta.url);
    const dataPath = path.join(__dirname, './src/db/data.json');
    fs.writeFileSync(dataPath, JSON.stringify(this.dataToJson));
  }

  generateNewTicket() {
    this.last += 1;
    this.tickets.push(new Ticket(this.last, null));
    this.saveDataInDb();
    return `Ticket ${this.last}`;
  }

  dispatchTicket(cashier) {
    if (this.tickets.length === 0) return null;
    const ticket = this.tickets.shift();
    ticket.cashier = cashier;
    this.lastFourTickets.unshift(ticket);
    if (this.lastFourTickets.length > 4) this.lastFourTickets.splice(-1, 1);
    this.saveDataInDb();
    return ticket;
  }
}
