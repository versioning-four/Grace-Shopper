import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateLineitemThunk, updateProductThunk } from '../redux/actions'
import { makePriceCurrencyFormat } from '../HelperFunctions'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      quantityChange: 1
    }
  }

  updateCartQuantity = (userId, orderId, id, item, quantityChange) => {
    const itemChanged = {
      ...item,
      quantity: Number(item.quantity) + Number(quantityChange)
    }
    return this.props.updateLineitem(userId, orderId, id, itemChanged)
  }

  handleQuantityChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { cart, totalCartPrice, userId, orderId } = this.props
    const { updateCartQuantity, handleQuantityChange } = this
    const { quantityChange } = this.state
    return (
      <div>
        <ul className="list-group">
          {cart.map(item => {
            const {
              id,
              name,
              quantity,
              productId,
              inventoryQuantity,
              totalItemPrice
            } = item
            const disableIncreaseButton =
              Number(quantity) + Number(quantityChange) > inventoryQuantity
            return (
              <li key={id} className="list-group-item">
                <ul>
                  <Link to={`/products/${productId}`}>{name}</Link>{' '}
                </ul>
                <ul>
                  <div>
                    {`Quantity: ${quantity}`}
                    <button
                      type="button"
                      onClick={() =>
                        updateCartQuantity(
                          userId,
                          orderId,
                          id,
                          item,
                          quantityChange
                        )
                      }
                      disabled={disableIncreaseButton}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateCartQuantity(
                          userId,
                          orderId,
                          id,
                          item,
                          -quantityChange
                        )
                      }
                      disabled={quantity - quantityChange < 0}
                    >
                      -
                    </button>
                    <label htmlFor="quantityChange">By: </label>
                    <input
                      type="text"
                      id="quantityChange"
                      name="quantityChange"
                      value={this.state.quantityChange}
                      onChange={handleQuantityChange}
                    />
                  </div>
                  {disableIncreaseButton && (
                    <small>{`You can NOT increase your order of item by ${quantityChange}. Do NOT have that amount left.`}</small>
                  )}
                </ul>
                <ul>{`Price: ${makePriceCurrencyFormat(totalItemPrice)}`}</ul>
                <button type="button">Remove item from cart</button>
              </li>
            )
          })}
        </ul>
        <div>{`Total Price: ${makePriceCurrencyFormat(totalCartPrice)}`}</div>
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
    ? cartTransformed.reduce((acc, item) => acc + item.totalItemPrice, 0)
    : 0
  return {
    cart: cartTransformed,
    totalCartPrice,
    userId: loggedInUser.id,
    orderId: userOrders.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateLineitem: (userId, orderId, lineitemId, lineitem) =>
      dispatch(updateLineitemThunk(userId, orderId, lineitemId, lineitem)),
    updateProduct: (productId, product) =>
      dispatch(updateProductThunk(productId, product))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
