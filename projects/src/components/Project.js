import React, { Fragment } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

function Project(props) {
  console.log(props);
  const project = props.projectList.find(
    project => project.id == props.match.params.projectId
  );
  console.log(project);

  function handleDelete() {
    props.handleDeleteProject(project.id);
    props.history.push('/');
  }
  console.log(props);
  return (
    <Fragment>
      <div>
        <button>Edit</button>
        <button>Delete</button>

        <ReactModal
          isOpen={props.showModal}
          contentLabel="Minimal Modal Example"
        >
          <div>Are you sure you want to delete this?</div>
          <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={props.handleCloseModal}>No</button>
          </div>
        </ReactModal>

        <div>
          <h1>{project.name}</h1>
          <h4>{project.description}</h4>
        </div>
      </div>
    </Fragment>
  );
}

export default Project;
