const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const connect = require('../database/connect');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      users: '/api/users',
    };

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    await connect();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use(morgan('dev'));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.categories, require('../routes/categories.routes'));
    this.app.use(this.paths.users, require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log('Sever listening at port', this.port)
    );
  }
}

module.exports = Server;
