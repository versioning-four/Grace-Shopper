import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getInProgressOrdersThunk } from '../redux/actions/inProgessOrders'
import { logoutUserThunk } from '../redux/actions/login'
import { deleteProductThunk } from '../redux/actions/product'

import { makePriceCurrencyFormat } from '../HelperFunctions'

class AdminPage extends Component {
  componentDidMount() {
    return this.props.inProgOrders()
  }

  render() {
    const { match, products, users, loggedInUser, deleteProduct } = this.props
    if (!loggedInUser.isAdmin)
      return <div>Sorry you don't have acess to this page</div>
    return (
      <div>
        <br />
        <div>
          <Link to={`/users/${loggedInUser.id}/admin/allorders`}>
            <button type="button">View all orders in progress</button>
          </Link>
          <Link to={`/users/${loggedInUser.id}/admin/allusers`}>
            <button type="button">View all current users</button>
          </Link>
          <Link to={`/users/${loggedInUser.id}/admin/allproducts`}>
            <button type="button">View all current products</button>
          </Link>
        </div>
        <br />
        <div>
          <div>
            <button type="button">Add a Product</button>
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
                  <h5>
                    {user.lastName}, {user.firstName}
                  </h5>
                  <div>Email: {user.email}</div>
                  <div>{user.isAdmin ? 'Is an Admin' : 'Not an Admin'}</div>
                  <div>
                    <button type="button">Delete User</button>
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
  deleteProduct: id => dispatch(deleteProductThunk(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)
