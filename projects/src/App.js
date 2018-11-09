import React, { Component } from 'react';
import { Route, NavLink, withRouter, Switch } from 'react-router-dom';
import axios from 'axios';
import { Project, ProjectForm, ProjectsList } from './components';

import './App.css';

const blankProjectForm = {
  name: '',
  description: ''
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      projectsData: [],
      project: {
        name: '',
        description: ''
      },
      isUpdating: false,
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal = () => {
    console.log('fired');
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  componentDidMount() {
    this.fetchProjects();
  }
  fetchProjects = () => {
    axios
      .get('https://localhost:9000/api/projects')
      .then(response => {
        this.setState({ projectsData: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    this.setState({
      project: {
        ...this.state.project,
        [event.target.name]: event.target.value
      }
    });
  };

  handleAddNewProject = () => {
    axios
      .post('https://localhost:9000/api/projects', this.state.project)
      .then(response => {
        let newProject = this.state.project;
        newProject.id = response.data.success;
        this.setState({
          projectsData: [...this.state.projectsData, newProject],
          project: blankProjectForm
        });
      });
  };

  handleDeleteProject = projectId => {
    axios
      .delete(`https://localhost:9000/api/projects/${projectId}`)
      .then(response => {
        const filteredProjects = this.state.projectsData.filter(
          project => project.id !== projectId
        );
        this.setState({ projectsData: filteredProjects });
      })
      .catch(err => {
        console.log(err);
      });
  };

  goToUpdateProjectForm = project => {
    this.setState({
      project,
      isUpdating: true
    });
    this.props.history.push('/projects-form');
  };

  handleUpdateProject = projectId => {
    axios
      .put(`https://localhost:9000/api/projects/${projectId}`, this.state.note)
      .then(response => {
        console.log('response', response);
        const udpatedProjects = this.state.projectsData.map(project => {
          if (project.id === response.data.id) {
            return response.data;
          } else {
            return project;
          }
        });
        this.setState({
          projectsData: udpatedProjects,
          isUpdating: false,
          project: blankProjectForm
        });
      });
  };

  render() {
    return (
      <div>
        <div>
          <h1>Lambda Projects</h1>
          <button>
            <NavLink exact to="/">
              View Your Projects
            </NavLink>
          </button>
          <button>
            <NavLink to="/project-form">+ Create New Project</NavLink>
          </button>
        </div>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <ProjectsList {...props} projectsList={this.state.projectsData} />
            )}
          />
          <Route
            path="/project-form"
            render={props => (
              <ProjectForm
                {...props}
                projectsList={this.state.projectsData}
                project={this.state.project}
                handleAddNewProject={this.handleAddNewProject}
                handleChange={this.handleChange}
                handleUpdateProject={this.handleUpdateProject}
                isUpdating={this.state.isUpdating}
              />
            )}
          />
          <Route
            path="/:projectId"
            render={props => (
              <Project
                {...props}
                projectsList={this.state.projectsData}
                handleDeleteProject={this.handleDeleteProject}
                handleOpenModal={this.handleOpenModal}
                handleCloseModal={this.handleCloseModal}
                goToUpdateProjectForm={this.goToUpdateProjectForm}
                showModal={this.state.showModal}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
