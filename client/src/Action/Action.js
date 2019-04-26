import React from 'react'
import './post.scss'
import ProjectSelector from '../ProjectSelector/ProjectSelector';

class Action extends React.Component {
    state = {
        action: {
            description: this.props.action.description,
            notes: this.props.action.notes,
            completed: this.props.action.completed,
            project_id: this.props.action.project_id
        },
        editing: false
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            action: {
                ...this.state.action,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSelector = e => {
        const name = e.target[e.target.selectedIndex]
        this.setState({
            ...this.state,
            action: {
                ...this.state.action,
                project_id: name
            }
        })
    }

    editAction = () => {
        this.props.edit(this.state.action, this.props.action.id)
        this.setState({
            ...this.state,
            editing: false
        })
    }

    render() {
        return (
            <div className='post'>
                <button
                    onClick={() => {
                        this.setState({
                            ...this.state,
                            editing: !this.state.editing
                        })
                    }}
                >{this.state.editing ? 'Cancel' : 'Edit Action'}</button>
                <p><span>Description: </span>{this.state.editing ?
                    <input
                        name='description'
                        onChange={this.handleChanges}
                        value={this.state.action.description}
                    /> :
                    this.props.action.description
                }</p>
                <p><span>Notes: </span>{this.state.editing ?
                    <input
                        name='notes'
                        onChange={this.handleChanges}
                        value={this.state.action.notes}
                    /> :
                    this.props.action.notes
                }</p>
                <p>{this.state.editing ?
                    <select
                        name='completed'
                        onChange={this.handleChanges}
                    >
                        <option value={false}>Not Complete</option>
                        <option value={true}>Complete</option>
                    </select> :
                    this.props.action.completed ? 'Complete' : 'Not Complete'
                }</p>
                {this.state.editing &&
                    <>
                        <span>Project: </span> <select
                            value={this.state.action.project_id}
                            onChange={this.handleSelector}
                        >
                            <option value='0'></option>
                            {this.props.projects.map((project, id) => (
                                <ProjectSelector project={project} key={id} />
                            ))}
                        </select>
                    </>}
                <button
                    style={{
                        display: this.state.editing ?
                            'none' : 'block'
                    }}
                    onClick={() => this.props.del(this.props.action.id)}
                >Delete</button>
                <button
                    style={{
                        display: !this.state.editing ?
                            'none' : 'block'
                    }}
                    onClick={() => this.editAction()}
                >Submit</button>
            </div>
        )
    }
}

export default Action
