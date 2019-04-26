import React from 'react'
import './user.scss'

class Project extends React.Component {
    state = {
        project: {
            name: this.props.project.name
        },
        editing: false
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                [e.target.name]: e.target.value
            }
        })
    }

    editProject = () => {
        this.props.edit(this.state.project, this.props.project.id)
        this.setState({
            ...this.state,
            editing: false
        })
    }

    render() {
        return (
            <div className='user'>
                <button
                    onClick={() => {
                        this.setState({
                            ...this.state,
                            editing: true
                        })
                    }}
                    style={{
                        display: this.state.editing ?
                            'none' : 'block'
                    }}
                >Edit Project</button>
                <p>Name: {this.state.editing ?
                    <input
                        name='name'
                        onChange={this.handleChanges}
                        value={this.state.project.name}
                    /> :
                    this.props.project.name
                }</p>
                <button
                    style={{
                        display: this.state.editing ?
                            'none' : 'block'
                    }}
                    onClick={() => this.props.del(this.props.project.id)}
                >Delete</button>
                <button
                    style={{
                        display: !this.state.editing ?
                            'none' : 'block'
                    }}
                    onClick={() => this.editProject()}
                >Submit</button>
            </div>
        )
    }
}

export default Project
