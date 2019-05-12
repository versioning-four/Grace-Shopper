import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCartThunk } from '../redux/actions/cart'
import { makePriceCurrencyFormat } from '../HelperFunctions'
import CartQuantitySelector from './CartQuantitySelector'

class SingleCartItem extends Component {
  render() {
    const { cartItem, userId, orderId, removeFromCart, history } = this.props
    const { id, name, productId, totalItemPrice, image } = cartItem
    return (
      <li key={id} className="list-group-item">
        <div className="row">
          <span className="col-sm-2">
            <img
              src={image}
              className="cart-item-image"
              onClick={() => history.push(`/products/${productId}`)}
            />
          </span>
          <Link to={`/products/${productId}`} className="col-sm-6">
            {name}
          </Link>{' '}
          <CartQuantitySelector userId={userId} cartItem={cartItem} />
          <span className="col-sm-2 price-color text-right">
            {makePriceCurrencyFormat(totalItemPrice)}
          </span>
        </div>

        <button
          type="button"
          className="remove-btn"
          onClick={() => {
            removeFromCart(userId, orderId, id)
          }}
        >
          Remove item from cart
        </button>
      </li>
    )
  }
}

const mapStateToProps = ({ loggedInUser, userOrders }) => {
  const cartOrder = userOrders.find(order => order.status === 'cart')
  return {
    userId: loggedInUser.id,
    orderId: cartOrder && cartOrder.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: (userId, orderId, lineitemId) =>
      dispatch(removeFromCartThunk(userId, orderId, lineitemId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCartItem)

//    const disableIncreaseButton =
//Number(quantity) + Number(quantityChange) > inventoryQuantity

/*<ul>
<div>
            {`Quantity: ${quantity}`}
            <button
              type="button"
              className="standard-btn"
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
              className="standard-btn"
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
        </ul>*/
