import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import Navigation from './layout/Navigation/Navigation'
import Footer from './layout/Footer/Footer'
import BookList from './pages/Books-list/Books-list'
import BookDetails from './pages/Book-details/Book-details'
import BookForm from './pages/Book-form/Book-form'
import BookEdit from './pages/Book-edit/Book-edit'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Home from './pages/Home/Home'

import AuthServices from './../service/auth.service'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'



class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: undefined }
    this.authServices = new AuthServices()
  }


  componentDidMount = () => {

    this.authServices
      .isLoggedIn()
      .then(response => this.setTheUser(response.data))
      .catch(err => this.setTheUser(undefined))
  }


  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El nuevo estado de App es:', this.state))


  render() {

    return (

      <>

        <Navigation storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} />

        <main>

          <Switch>

            <Route path="/" exact render={() => <Home loggedUser={this.state.loggedInUser} />} />
            <Route path="/libros" exact render={() => <BookList loggedUser={this.state.loggedInUser} />} />
            <Route path="/libros/:book_id" exact render={props => <BookDetails {...props} loggedUser={this.state.loggedInUser} />} />
            <Route path="/crear" render={() => <BookForm />} />
            <Route path="/libros/editar/:book_id" exact render={props => <BookEdit {...props} />} />
            <Route path="/registro" render={props => <Signup storeUser={this.setTheUser} {...props} />} />
            <Route path="/inicio-sesion" render={props => <Login storeUser={this.setTheUser} {...props} />} />
            <Route path="/perfil" render={() => this.state.loggedInUser ? <Profile user={this.state.loggedInUser} /> : <Redirect to="/inicio-sesion" />} />

          </Switch>

        </main>

        <Footer />

      </>

    )

  }

}



export default App
