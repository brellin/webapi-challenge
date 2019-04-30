import React, { Component } from 'react'
import ProjectSelector from '../../ProjectSelector'

export default class NewAction extends Component {
    state = {
        description: '',
        project_id: '',
        notes: '',
        completed: false
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <>
                <input
                    name='description'
                    onChange={this.handleChanges}
                    value={this.state.description}
                />
                <input
                    name='notes'
                    onChange={this.handleChanges}
                    value={this.state.notes}
                />
                <div>
                    <span>Project: </span>
                    <select>
                        <option value='0' />
                        {this.props.projects.map((project, id) => (
                            <ProjectSelector project={project} key={id} />
                        ))}
                    </select>
                </div>
                <div>
                    <span>Complete: </span>
                    <select
                        name='completed'
                        onChange={this.handleChanges}
                        value={this.state.completed}
                    >
                        <option value={false}>Not Complete</option>
                        <option value={true}>Complete</option>
                    </select>
                </div>
                <button
                    onClick={() => {
                        this.props.add(this.state)
                        this.setState({
                            description: '',
                            project_id: '',
                            notes: '',
                            completed: ''
                        })
                        this.props.newOne()
                    }}
                >Submit</button>
            </>
        )
    }
}
