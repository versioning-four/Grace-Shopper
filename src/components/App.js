import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllProductsThunk } from '../redux/actions'
import Products from './Products'
import SingleProduct from './SingleProduct'

class App extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return (
      <Router>
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
