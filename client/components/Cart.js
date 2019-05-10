import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeAllItemsFromCartThunk } from '../redux/actions/cart'
import { updateProductThunk } from '../redux/actions/product'
import {
  updateOrderThunk,
  createNewOrderThunk
} from '../redux/actions/userOrders'
import { makePriceCurrencyFormat } from '../HelperFunctions'
import SingleCartItem from './SingleCartItem'

class Cart extends Component {
  handleCheckout = (userId, currentOrder) => {
    const {
      updateProduct,
      updateOrder,
      createNewOrder,
      resetCartToEmpty,
      cart,
      products,
      history
    } = this.props

    return Promise.all([
      updateOrder(userId, currentOrder.id, {
        ...currentOrder,
        status: 'in-progress'
      }).then(() => createNewOrder(userId, { userId })),
      cart.map(item => {
        const selectedProduct = products.find(
          product => product.id === item.productId
        )
        return updateProduct(selectedProduct.id, {
          ...selectedProduct,
          inventoryQuantity: selectedProduct.inventoryQuantity - item.quantity
        })
      })
    ])
      .then(() => history.push('/checkoutpage'))
      .then(() => resetCartToEmpty())
  }

  render() {
    const {
      cart,
      totalCartPrice,
      userId,
      currentOrder,
      removeAllItemsFromCart
    } = this.props
    const { handleCheckout } = this
    return (
      <div className="cart-list">
        <ul className="list-group">
          {cart.map(item => (
            <SingleCartItem cartItem={item} key={item.id} />
          ))}
        </ul>
        <div>{`Total Price: ${makePriceCurrencyFormat(totalCartPrice)}`}</div>
        <button
          type="button"
          onClick={() => handleCheckout(userId, currentOrder)}
          className="standard-btn"
        >
          Checkout
        </button>
        <button
          type="button"
<<<<<<< HEAD
          className="remove-btn"
          onClick={() => resetCartToEmpty()}
=======
          onClick={() => removeAllItemsFromCart(userId, currentOrder.id)}
>>>>>>> 6097f1b6b3b0dc794149c464070d50ba0dcb9de3
        >
          Clear Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({ loggedInUser, userOrders, products, cart }) => {
  const productsMap = products.reduce((acc, product) => {
    const { name, price, inventoryQuantity } = product
    const selectedProductFields = { name, price, inventoryQuantity }
    acc[`productId${product.id}`] = selectedProductFields
    return acc
  }, {})
  const cartTransformed = cart
    .map(item => ({
      ...item,
      ...productsMap[`productId${item.productId}`]
    }))
    .map(item => ({
      ...item,
      totalItemPrice: (item.quantity * item.price).toFixed(2)
    }))
  const totalCartPrice = cartTransformed[0]
    ? cartTransformed.reduce(
        (acc, item) => acc + Number(item.totalItemPrice),
        0
      )
    : 0
  return {
    products,
    cart: cartTransformed,
    totalCartPrice,
    userId: loggedInUser.id,
    currentOrder: userOrders.find(order => order.status === 'cart') || {}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: (productId, product) =>
      dispatch(updateProductThunk(productId, product)),
    updateOrder: (userId, orderId, order) =>
      dispatch(updateOrderThunk(userId, orderId, order)),
    createNewOrder: (userId, newOrder) =>
      dispatch(createNewOrderThunk(userId, newOrder)),
    removeAllItemsFromCart: (userId, orderId) =>
      dispatch(removeAllItemsFromCartThunk(userId, orderId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
