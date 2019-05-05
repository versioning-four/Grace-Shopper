import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCartThunk } from '../redux/actions'

class AddToCartButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(loggedInUserId, orderId, lineitem) {
    this.props.addToCart(loggedInUserId, orderId, lineitem)
  }

  render() {
    const { product, loggedInUserId, orderId } = this.props
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
        >
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({ loggedInUser, userOrders }) => {
  console.log(userOrders)
  const findOrderId = userOrders.find(order => order.status === 'cart')
  return {
    loggedInUserId: loggedInUser.id,
    orderId: findOrderId ? findOrderId.id : 0
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
