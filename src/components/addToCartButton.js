import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCartThunk } from '../redux/actions'
import { Link } from 'react-router-dom'

class AddToCartButton extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value })

  handleClick = (loggedInUserId, orderId, lineitem) => {
    this.props.addToCart(loggedInUserId, orderId, lineitem)
  }

  render() {
    const { handleClick, handleChange } = this
    const { product, loggedInUserId, orderId, productInCart } = this.props
    return (
      <div>
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={this.state.quantity}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() =>
            handleClick(loggedInUserId, orderId, {
              orderId,
              productId: product.id,
              quantity: this.state.quantity
            })
          }
          disabled={productInCart}
        >
          Add To Cart
        </button>
        {productInCart && (
          <small>
            Item already in cart. Go to <Link to="/cart">cart</Link> to change
            quantity
          </small>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ loggedInUser, userOrders, cart }, { product }) => {
  const findOrderId = userOrders.find(order => order.status === 'cart')
  return {
    loggedInUserId: loggedInUser.id,
    orderId: findOrderId ? findOrderId.id : 0,
    productInCart: cart.map(item => item.productId).includes(product.id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (loggedInUserId, orderId, product) =>
      dispatch(addToCartThunk(loggedInUserId, orderId, product))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToCartButton)
