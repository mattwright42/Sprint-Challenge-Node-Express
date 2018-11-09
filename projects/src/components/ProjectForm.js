import React, { Fragment } from 'react';

function NoteForm(props) {
  function handleSubmit(event) {
    event.preventDefault();

    if (props.isUpdating) {
      props.handleUdpateProject(props.project.id);
      props.history.push('/');
    } else {
      props.handleAddNewProject();
      props.history.push('/');
    }
  }

  return (
    <Fragment>
      <div>
        <h2>{props.isUpdating ? 'Edit Project' : 'Create New Project'}</h2>
        <form>
          <div>
            <input
              className="project-title-input"
              type="text"
              value={props.project.name}
              placeholder="Project Name"
              name="name"
              onChange={props.handleChange}
            />
          </div>
          <div>
            <textarea
              className="project-description-input"
              placeholder="Project Description"
              name="description"
              cols="50"
              rows="1"
              wraps="physical"
              type="text"
              value={props.project.description}
              onChange={props.handleChange}
            />
          </div>
          <button
            className="create-button"
            onClick={event => handleSubmit(event)}
          >
            {props.isUpdating ? 'Update' : 'Save'}{' '}
          </button>
        </form>
      </div>
    </Fragment>
  );
}

export default ProjectForm;
