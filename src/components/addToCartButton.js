import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCartThunk } from '../redux/actions'
import { Link } from 'react-router-dom'

class AddToCartButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(loggedInUserId, orderId, lineitem) {
    this.props.addToCart(loggedInUserId, orderId, lineitem)
  }

  render() {
    const { product, loggedInUserId, orderId, productInCart } = this.props
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            this.handleClick(loggedInUserId, orderId, {
              productId: product.id,
              quantity: 1
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
