import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllProductsThunk, getAllCategoriesThunk } from '../redux/actions'

import Home from './Home'
import Nav from './Nav'
import Login from './Login'
import Products from './Products'
import SingleProduct from './SingleProduct'
import Cart from './Cart'

class App extends Component {
  componentDidMount() {
    const { getAllCategories, getAllProducts } = this.props
    return Promise.all([getAllCategories(), getAllProducts()])
  }

  render() {
    return (
      <Router>
        <Route component={Nav} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/cart" component={Cart} />
          <Route
            exact
            path="/products/category/:categoryId"
            component={Products}
          />
          <Route path="/products/:id" component={SingleProduct} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk()),
    getAllCategories: () => dispatch(getAllCategoriesThunk())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
