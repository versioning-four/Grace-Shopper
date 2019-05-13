import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  removeAllItemsFromCartThunk,
  resetCartToEmpty
} from '../redux/actions/cart'
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

    if (!userId) {
      return history.push('/checkoutlogin')
    }

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
      removeAllItemsFromCart,
      history
    } = this.props
    const { handleCheckout } = this
    return (
      <div className="cart-list">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="row">
              <span className="col-sm-8" />
              <span className="col-sm-2 text-right">Quantity</span>
              <span className="col-sm-2 text-right">Price</span>
            </div>
          </li>
          {cart.map(item => (
            <SingleCartItem cartItem={item} key={item.id} history={history} />
          ))}
        </ul>
        <div className="row cart-summary">
          <span className="col-sm-8" />
          <span className="col-sm-2 text-right">
            <strong>Total Price</strong>
          </span>
          <span className="col-sm-2 price-color text-right">
            {makePriceCurrencyFormat(totalCartPrice)}
          </span>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="remove-btn"
            onClick={() => removeAllItemsFromCart(userId, currentOrder.id)}
          >
            Clear Cart
          </button>

          <button
            type="button"
            onClick={() => handleCheckout(userId, currentOrder)}
            className="standard-btn "
            disabled={
              cart.length === 0 || cart.some(item => item.canNotBeCheckedOut)
            }
          >
            Checkout
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ loggedInUser, userOrders, products, cart }) => {
  const productsMap = products.reduce((acc, product) => {
    const { name, price, inventoryQuantity, image } = product
    const selectedProductFields = { name, price, inventoryQuantity, image }
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
      totalItemPrice: (item.quantity * item.price).toFixed(2),
      canNotBeCheckedOut:
        ['', '0'].includes(item.quantity) ||
        item.inventoryQuantity - item.quantity < 0
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
      dispatch(removeAllItemsFromCartThunk(userId, orderId)),
    resetCartToEmpty: () => dispatch(resetCartToEmpty())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
