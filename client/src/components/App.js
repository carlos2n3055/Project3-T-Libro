import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import BookList from './pages/Books-list/Books-list'


class App extends Component {

  constructor() {

    super()

  }
  render() {


    return (

      <main>

        <Switch>

          <Route path="/libros" exact render={() => <BookList />} />

        </Switch>

      </main>

    )
  }
}

export default App;

//loggedUser = { this.state.loggedInUser } 
