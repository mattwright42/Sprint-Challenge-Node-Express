const express = require('express');
const cors = require('cors');
const action = require('../data/helpers/actionModel');
const project = require('../data/helpers/projectModel');

const server = express();

server.use(express.json());
server.use(cors());

// sanity check
server.get('/', (req, res) => {
  res.status(200).json({ api: 'Here we go!' });
});

// routes for actions
server.get('/api/actions', (req, res) => {
  action
    .get()
    .then(actions => res.status(200).json(actions))
    .catch(err =>
      res
        .status(500)
        .json({
          message: 'The action information could not be retrieved.',
          error: err
        })
    );
});

// routes for projects

module.exports = server;
