import React from 'react';

function ProjectsList(props) {
  if (!props.projectsList.length) {
    return <h1>Fetching projects!</h1>;
  }
  return (
    <div>
      <h1>Your Projects:</h1>
      {props.projectsList.map(project => (
        <div key={project.id}>
          <h1>
            {project.name > 20
              ? `${project.name.slice(0, 20)}...`
              : project.title}
          </h1>
          <p>
            {project.description.length > 120
              ? `${project.description.slice(0, 20)}...`
              : project.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProjectsList;
