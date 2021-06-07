const express = require('express');
const morgan = require('morgan');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(express.static('public'));
    this.app.use(morgan('dev'));
  }

  routes() {
    this.app.get('/api', (_req, res) => {
      res.json({
        msg: 'get API',
      });
    });

    this.app.put('/api', (_req, res) => {
      res.json({
        msg: 'put API',
      });
    });

    this.app.post('/api', (_req, res) => {
      res.json({
        msg: 'post API',
      });
    });

    this.app.delete('/api', (_req, res) => {
      res.json({
        msg: 'delete API',
      });
    });
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log('Sever listening at port', this.port)
    );
  }
}

module.exports = Server;
