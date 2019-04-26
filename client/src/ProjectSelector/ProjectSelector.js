import React from 'react'

const ProjectSelector = props => {
    return (
        <option className='selector' value={props.project.id}>
            {props.project.name}
        </option>
    )
}

export default ProjectSelector
