import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as Servidor } from 'socket.io';
import { socketController } from '../sockets/controller.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {};
    this.server = createServer(this.app);
    this.io = new Servidor(this.server);

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();

    // Sockets config
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Defined 'public' directory
    this.app.use(express.static('public'));
  }

  routes() {
    // this.app.use(this.paths.auth, require('../routes/auth.routes'));
  }

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('App listening on port', process.env.PORT);
    });
  }
}

export default Server;
