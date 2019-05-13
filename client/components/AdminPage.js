import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getInProgressOrdersThunk } from '../redux/actions/inProgessOrders'
import { completeOrderThunk } from '../redux/actions/CompleteOrder'

class AdminPage extends Component {
  componentDidUpdate(prevProps) {
    console.log('here prevProps', prevProps)
    console.log('this props', this.props)
    if (prevProps.match.path !== this.props.match.path) {
      return this.props.inProgOrders()
    }
  }

  componentDidMount() {
    return this.props.inProgOrders()
  }

  completeOrderMethod = (orderId, status) => {
    return this.props.complete(orderId, status)
  }

  render() {
    const {
      match,
      products,
      users,
      inProgressOrders,
      loggedInUser
    } = this.props

    const { completeOrderMethod } = this

    if (!loggedInUser.isAdmin)
      return <div>Sorry you don't have acess to this page</div>
    return (
      <div className="admin-user">
        <br />
        <div>
          <Link to={`/users/${loggedInUser.id}/admin/ordersinprogress`}>
            <button className="admin-btn" type="button">
              View all orders in progress
            </button>
          </Link>
          <Link to={`/users/${loggedInUser.id}/admin/allusers`}>
            <button className="admin-btn" type="button">
              View all current users
            </button>
          </Link>
          <Link to={`/users/${loggedInUser.id}/admin/allproducts`}>
            <button className="admin-btn" type="button">
              View all current products
            </button>
          </Link>
        </div>
        <br />
        <div>
          <div>
            <button className="admin-btn" type="button">
              Add a Product
            </button>
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
                    <button className="edit-btn" type="button">
                      Edit Product
                    </button>
                    <button className="remove-btn" type="button">
                      Delete Product
                    </button>
                  </div>
                  <br />
                </div>
              )
            })}

          {match.params.adminFilter === 'allusers' &&
            users.map(user => {
              return (
                <div key={user.id}>
                  <h3>
                    {user.lastName}, {user.firstName}
                  </h3>
                  <div>Email: {user.email}</div>
                  <div>{user.isAdmin ? 'Is an Admin' : 'Not an Admin'}</div>
                  <div>
                    <button className="remove-btn" type="button">
                      Delete User
                    </button>
                  </div>
                  <br />
                </div>
              )
            })}

          {match.params.adminFilter === 'ordersinprogress' &&
            inProgressOrders.map(order => {
              return (
                <div key={order.id}>
                  <h3>
                    Order for {order.user.lastName}, {order.user.firstName}
                  </h3>
                  <div>Email: {order.user.email}</div>
                  <div>
                    {order.lineitems.map(lineitem => {
                      return (
                        <div key={lineitem.id}>
                          <div>
                            {lineitem.product.name} x {lineitem.quantity}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div>
                    <button
                      className="standard-btn"
                      type="button"
                      onClick={() =>
                        completeOrderMethod(order.id, { status: 'completed' })
                      }
                    >
                      Complete order
                    </button>
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
  complete: (orderId, status) => dispatch(completeOrderThunk(orderId, status))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)
