import React from 'react';
import Action from './Action'
import Project from './Project'
import NewAction from './Action/NewAction'
import NewProject from './Project/NewProject'
import ProjectSelector from './ProjectSelector/ProjectSelector';
import axios from 'axios'
import './App.scss';

const url = 'http://localhost:5000/'

class App extends React.Component {
  state = {
    actions: [],
    projects: localStorage.getItem('projects') !== null ? JSON.parse(localStorage.getItem('projects')) : [],
    project: localStorage.getItem('bool') !== null ? JSON.parse(localStorage.getItem('bool')) : true,
    newOne: false,
    specific: false,
    pj: {
      id: '',
      list: [],
      name: ''
    }
  }

  componentDidMount() {
    axios
      .get(`${url}${this.state.project ? 'projects' : this.state.specific ? `projects/project${this.state.pj.id}` : 'actions'}`)
      .then(res => {
        this.state.specific ?
          this.setState({
            ...this.state,
            pj: {
              ...this.state.pj,
              list: res.data
            }
          })
          :
          this.setState({
            ...this.state,
            [this.state.project ? 'projects' : 'actions']: res.data
          })
        this.state.project && localStorage.setItem('projects', JSON.stringify(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }

  switch = () => {
    setTimeout(() => {
      this.setState({
        ...this.state,
        project: !this.state.project
      })

      localStorage.setItem('bool', this.state.project)

      axios
        .get(`${url}${this.state.project ? 'projects' : 'actions'}`)
        .then(res => {
          this.setState({
            ...this.state,
            [this.state.project ? 'projects' : 'actions']: res.data
          })
          this.state.project && localStorage.setItem('projects', JSON.stringify(res.data))
        })
        .catch(err => {
          console.log(err)
        })
    }, 500)
  }

  add = sub => {
    axios
      .action(`${url}${this.state.project ? 'projects' : 'actions'}`, sub)
      .then(res => {
        this.setState({
          ...this.state,
          [this.state.project ? 'projects' : 'actions']: res.data
        })
        this.state.project && localStorage.setItem('projects', JSON.stringify(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }

  edit = (sub, id) => {
    axios
      .put(`${url}${this.state.project ? 'projects' : 'actions'}/${id}`, sub)
      .then(res => {
        this.setState({
          ...this.state,
          [this.state.project ? 'projects' : 'actions']: res.data
        })
        this.state.project && localStorage.setItem('projects', JSON.stringify(res.data))
      })
      .catch(err => console.log(err))
  }

  del = id => {
    axios
      .delete(`${url}${this.state.project ? 'projects' : 'actions'}/${id}`)
      .then(res => {
        this.setState({
          ...this.state,
          [this.state.project ? 'projects' : 'actions']: res.data
        })
        this.state.project && localStorage.setItem('projects', JSON.stringify(res.data))
      })
      .catch(err => console.log(err))
  }

  newOne = () => {
    this.setState({ newOne: !this.state.newOne })
  }

  handleSelector = e => {
    const name = e.target[e.target.selectedIndex].text
    this.setState({
      ...this.state,
      project: false,
      specific: true,
      pj: {
        ...this.state.pj,
        id: e.target.value,
        name: name
      }
    })
    setTimeout(() => this.getSpecific(), 500)
  }

  getSpecific = () => {
    axios
      .get(`${url}projects/project/${this.state.pj.id}`)
      .then(res => {
        this.setState({
          ...this.state,
          pj: {
            ...this.state.pj,
            list: res.data
          }
        })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 onClick={() => this.switch()}>{this.state.project ?
            'Projects'
            :
            this.state.specific ?
              `${this.state.pj.name}'s Quotes`
              :
              'All Quotes'}</h1>
        </header>

        <section>
          <div className='selector-div'>
            <span>Select a name:</span>
            <select
              value={this.state.pj.id}
              onChange={this.handleSelector}
            >
              <option value='0'></option>
              {this.state.projects.map((project, id) => (
                <ProjectSelector project={project} key={id} />
              ))}
            </select>
          </div>
          {!this.state.newOne ?
            this.state.project ?
              this.state.projects.map((project, id) => (
                <Project project={project} edit={this.edit} del={this.del} key={id} />
              ))
              :
              this.state.specific ?
                this.state.pj.list.map((action, id) => (
                  <Action action={action} projects={this.state.projects} edit={this.edit} del={this.del} specific={this.state.specific} key={id} />
                ))
                :
                this.state.actions.map((action, id) => (
                  <Action action={action} projects={this.state.projects} edit={this.edit} del={this.del} key={id} />
                ))
            :
            this.state.project ?
              <NewProject newOne={this.newOne} add={this.add} />
              :
              <NewAction newOne={this.newOne} add={this.add} />
          }
          <button
            onClick={() => this.newOne()}
            style={{
              display: this.state.newOne ?
                'none' : 'block'
            }}
          >New Action</button>
        </section>

        <footer>
          I only put this here because I wanted some space at the bottom.
        </footer>
      </div>
    );
  }
}

export default App;
