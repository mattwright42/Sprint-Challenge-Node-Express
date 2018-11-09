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

module.exports = server;
