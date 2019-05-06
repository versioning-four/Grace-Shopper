import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateLineitemThunk } from '../redux/actions'
import { makePriceCurrencyFormat } from '../HelperFunctions'

class SingleCartItem extends Component {
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
    const { cartItem, userId, orderId } = this.props
    const { updateCartQuantity, handleQuantityChange } = this
    const { quantityChange } = this.state

    const {
      id,
      name,
      quantity,
      productId,
      inventoryQuantity,
      totalItemPrice
    } = cartItem
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
                  cartItem,
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
                  cartItem,
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
  }
}

const mapStateToProps = ({ loggedInUser, userOrders }) => ({
  userId: loggedInUser.id,
  orderId: userOrders.id
})

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
)(SingleCartItem)
