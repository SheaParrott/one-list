//add new item
//delete a new item
//complete a new item

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      newItemText: ''
    }
  }

  loadAllThetodos = () => {
    axios
      .get(
        'https://one-list-api.herokuapp.com/items?access_token=sheassuperfunlist'
      )
      .then(response => {
        this.setState({
          todos: response.data
        })
      })
  }

  componentDidMount = () => {
    this.loadAllThetodos()
  }

  changeText = event => {
    this.setState({
      newItemText: event.target.value
    })
  }
  newItem = event => {
    event.preventDefault()
    axios
      .post(
        'https://one-list-api.herokuapp.com/items?access_token=sheassuperfunlist',
        {
          text: this.state.newItemText,
          complete: false
        }
      )
      .then(response => {
        this.loadAllThetodos()
      })
  }
  deleteAnItem = event => {
    axios
      .delete(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.todoid
        }?access_token=sheassuperfunlist`
      )
      .then(response => {
        this.loadAllThetodos()
      })
  }

  updateAnItem = event => {
    // console.log(event.target.dataset.complete)
    // let complete = event.target.dataset.complete === false ? true : false
    axios
      .put(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.todoid
        }?access_token=sheassuperfunlist`,
        {
          item: {
            complete: true
          }
        }
      )
      .then(response => {
        this.loadAllThetodos()
      })
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>One List</h1>
        </header>
        <main>
          <ul className="one-list">
            {this.state.todos.map((todo, index) => {
              const todoClass = todo.complete ? 'completed' : ''
              return (
                <li
                  onDoubleClick={this.deleteAnItem}
                  onClick={this.updateAnItem}
                  data-todoid={todo.id}
                  data-complete={todo.complete}
                  key={index}
                  className={todoClass}
                >
                  {todo.text}
                </li>
              )
            })}
          </ul>
          <form onSubmit={this.newItem}>
            <input
              value={this.state.newItemText}
              type="text"
              placeholder="Whats up?"
              onChange={this.changeText}
            />
          </form>
        </main>
        <footer>
          <p>
            <img src={logo} height="42" alt="logo" />
          </p>
          <p>&copy; Shea Copyright Nonesense</p>
        </footer>
      </div>
    )
  }
}

export default App
