import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllProductsThunk } from '../redux/actions'

import Home from './Home'
import Nav from './Nav'
import Login from './Login'
import Products from './Products'
import SingleProduct from './SingleProduct'

class App extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return (
      <Router>
        <Route component={Nav} />
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:id" component={SingleProduct} />
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
