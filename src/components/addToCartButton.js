import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCartThunk } from '../redux/actions'

class AddToCartButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick(userId, orderId, lineitem) {
    await this.props.addToCart(userId, orderId, lineitem)
  }

  render() {
    const { product, userId, orderId } = this.props
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            this.handleClick(userId, orderId, {
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

const mapStateToProps = ({ user, userOrders }) => {
  console.log(userOrders)
  const findOrderId = userOrders.find(order => order.status === 'cart')
  return {
    userId: user.id,
    orderId: findOrderId ? findOrderId.id : 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (userId, orderId, product) =>
      dispatch(addToCartThunk(userId, orderId, product))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToCartButton)
