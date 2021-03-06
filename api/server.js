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
      res.status(500).json({
        message: 'The action information could not be retrieved.',
        error: err
      })
    );
});

server.get('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  action
    .get(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({
          message: 'The action with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'The action information could not be retrieved.',
        error: err
      });
    });
});

server.delete('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  action
    .remove(id)
    .then(count => res.status(200).json(count))
    .catch(err =>
      res
        .status(400)
        .json({ message: 'Your action could not be deleted.', error: err })
    );
});

server.post('/api/actions', (req, res) => {
  action
    .insert(req.body)
    .then(success => res.status(201).json(success))
    .catch(err =>
      res
        .status(400)
        .json({ message: 'Your action could not be added.', error: err })
    );
});

server.put('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  action
    .update(id, req.body)
    .then(count => res.status(201).json(count))
    .catch(err =>
      res
        .status(400)
        .json({ message: 'Your action could not be updated.', error: err })
    );
});

// routes for projects
server.get('/api/projects', (req, res) => {
  project
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({
        message: 'The project information could not be retrieved.',
        error: err
      });
    });
});

server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  project
    .get(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          message: 'The project with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'The project information could not be retrieved.',
        error: err
      });
    });
});

server.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  project
    .remove(id)
    .then(count => res.status(200).json(count))
    .catch(err =>
      res
        .status(400)
        .json({ message: 'Your project could not be deleted.', error: err })
    );
});

server.post('/api/projects', (req, res) => {
  project
    .insert(req.body)
    .then(success => res.status(201).json(success))
    .catch(err =>
      res
        .status(400)
        .json({ message: 'Your project could not be added.', error: err })
    );
});

server.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  project
    .update(id, req.body)
    .then(count => res.status(201).json(count))
    .catch(err =>
      res
        .status(400)
        .json({ message: 'Your project could not be updated.', error: err })
    );
});

// getProjectActions()
server.get('/api/projects/actions/:id', (req, res) => {
  const { id } = req.params;
  project
    .getProjectActions(id)
    .then(list => {
      list.length > 0
        ? res.status(200).json(list)
        : res
            .status(404)
            .json({ Message: 'The project does not exist/has no actions.' });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Actions for the specified project could not be retrieved.',
        error: err
      });
    });
});

module.exports = server;
