import React, { Component } from 'react'

export default class NewProject extends Component {
    state = {
        name: '',
        description: ''
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render() {
        console.log(this.state)
        return (
            <>
                <input
                    name='name'
                    onChange={this.handleChanges}
                    value={this.state.name}
                />
                <input
                    name='description'
                    onChange={this.handleChanges}
                    value={this.state.description}
                />
                <button
                    onClick={() => {
                        this.props.add(this.state)
                        this.setState({
                            name: '',
                            description: ''
                        })
                        this.props.newOne()
                    }}
                >Submit</button>
            </>
        )
    }
}
