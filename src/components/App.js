import React, { Component } from 'react'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'

import Home from './Home'
import Nav from './Nav'
import Login from './Login'
// import Cart from './Cart'

class App extends Component {
  render () {
    return (
      <Router>
        <Route component={ Nav } />
        <Route exact path='/' component={ Home } />
        <Route exact path='/login' component={ Login } />

      </Router>
    )
  }
}


export default App
