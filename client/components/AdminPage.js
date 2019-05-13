import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getInProgressOrdersThunk } from '../redux/actions/inProgessOrders'
import { logoutUserThunk } from '../redux/actions/login'
import { deleteProductThunk } from '../redux/actions/product'
import { makePriceCurrencyFormat } from '../HelperFunctions'
import { completeOrderThunk } from '../redux/actions/CompleteOrder'

class AdminPage extends Component {
  componentDidUpdate(prevProps) {
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
      loggedInUser,
      deleteProduct
    } = this.props
    const { completeOrderMethod } = this
    if (!loggedInUser.isAdmin)
      return <div>Sorry you don't have acess to this page</div>
    return (
      <div className="admin-user">
        <br />
        <div>
          <Link to={`/users/${loggedInUser.id}/myaccount/admin/allorders`}>
            <button className="admin-btn" type="button">
              View all orders in progress
            </button>
          </Link>
          <Link to={`/users/${loggedInUser.id}/myaccount/admin/allusers`}>
            <button className="admin-btn" type="button">
              View all current users
            </button>
          </Link>
          <Link to={`/users/${loggedInUser.id}/myaccount/admin/allproducts`}>
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
          <ul className="list-group">
            {match.params.adminFilter === 'allproducts' &&
              products.map(product => {
                return (
                  <li key={product.id} className="list-group-item">
                    <div className="row">
                      <div className="col-4 product-list">
                        <img src={`${product.image}`} />
                      </div>
                      <div className="col-8">
                        <h4>{product.name}</h4>
                        <div>
                          Price: {makePriceCurrencyFormat(product.price)}
                        </div>
                        <div>Inventory: {product.inventoryQuantity}</div>
                        <div>
                          <button type="button" className="standard-btn">
                            Edit Product
                          </button>
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => deleteProduct(product.id)}
                          >
                            Delete Product
                          </button>
                        </div>
                      </div>
                      <br />
                    </div>
                  </li>
                )
              })}
          </ul>
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
  logoutUser: () => dispatch(logoutUserThunk()),
  deleteProduct: id => dispatch(deleteProductThunk(id)),
  complete: (orderId, status) => dispatch(completeOrderThunk(orderId, status))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)
