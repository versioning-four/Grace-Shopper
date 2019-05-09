import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getInProgressOrdersThunk } from '../redux/actions/inProgessOrders'
import { logoutUserThunk } from '../redux/actions/login'

class AdminPage extends Component {
  componentDidMount() {
    return this.props.inProgOrders()
  }

  render() {
    const {
      logoutUser,
      history,
      match,
      products,
      users,
      inProgressOrders,
      loggedInUser
    } = this.props
    console.log(match.params)
    if (!loggedInUser.isAdmin)
      return <div>Sorry you don't have acess to this page</div>
    return (
      <div>
        <div>
          <button
            type="button"
            onClick={() => {
              logoutUser().then(() => history.push('/home'))
            }}
          >
            Logout
          </button>
        </div>
        <br />
        <div>
          <Link to={`/admin/users/${loggedInUser.id}/allorders`}>
            <button type="button">View all orders in progress</button>
          </Link>
          <Link to={`/admin/users/${loggedInUser.id}/allusers`}>
            <button type="button">View all current users</button>
          </Link>
          <Link to={`/admin/users/${loggedInUser.id}/allproducts`}>
            <button type="button">View all current products</button>
          </Link>
        </div>
        <br />
        <div>
          <div>
            <button type="button">Add a Product</button>
          </div>
          <br />
          {match.params.adminFilter === 'allproducts' &&
            products.map(product => {
              return (
                <div key={product.id}>
                  <h3>Name: {product.name}</h3>
                  <div>Price: {product.price}</div>
                  <div>On hand: {product.inventoryQuantity}</div>
                  <div>
                    <button type="button">Edit Product</button>
                    <button type="button">Delete Product</button>
                  </div>
                  <br />
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  inProgressOrders,
  users,
  products,
  loggedInUser
}) => ({
  inProgressOrders,
  users,
  products,
  loggedInUser
})

const mapDispatchToProps = dispatch => ({
  inProgOrders: () => dispatch(getInProgressOrdersThunk()),
  logoutUser: () => dispatch(logoutUserThunk())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)
