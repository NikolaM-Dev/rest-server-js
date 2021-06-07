const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.static('public'));
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
      res.status(201).json({
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
