import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateLineitemThunk } from '../redux/actions/cart'

class CartQuantitySelector extends Component {
  constructor(props) {
    super(props)
    const { cartItem } = this.props
    this.state = {
      quantity: cartItem ? Number(cartItem.quantity) || 1 : 1,
      dropdownInput: cartItem ? cartItem.quantity < 10 : true
    }
  }

  componentDidMount() {
    const { cartItem, userId } = this.props
    const { orderId, id } = cartItem
    return this.props.updateLineitem(userId, orderId, id, {
      ...cartItem,
      quantity: this.state.quantity
    })
  }

  componentDidUpdate(prevProps) {
    const { quantity } = this.props.cartItem
    if (!prevProps.cartItem && this.props.cartItem) {
      this.setState({ quantity, dropdownInput: quantity < 10 })
    }
  }

  handleChange = (userId, orderId, id, item, value) => {
    this.setState(
      prevState => {
        return {
          quantity:
            /^[0-9]+$/.test(value) || value === '' ? value : prevState.quantity,
          dropdownInput: prevState.dropdownInput && Number(value) < 10
        }
      },
      () => {
        return this.props.updateLineitem(userId, orderId, id, {
          ...item,
          quantity: this.state.quantity || 0
        })
      }
    )
  }

  render() {
    const { cartItem, userId } = this.props
    const { orderId, id, inventoryQuantity, name } = cartItem
    const { handleChange } = this
    const { quantity, dropdownInput } = this.state
    const arr1To10 = Array(10)
      .fill(1)
      .map((element, idx) => element + idx)
    const quantityNotAllowed = inventoryQuantity - Number(quantity) < 0

    if (!dropdownInput) {
      return (
        <div className="col-sm-2 text-right">
          <input
            className="form-control"
            type="text"
            name="quantity"
            value={quantity}
            onChange={({ target: { value } }) =>
              handleChange(userId, orderId, id, cartItem, value)
            }
          />
          {['', '0'].includes(quantity) && (
            <small>
              Can only enter non-zero number. Field can not be empty
            </small>
          )}
          {quantityNotAllowed && (
            <small>{`We do NOT have ${quantity} ${name}s left`}</small>
          )}
        </div>
      )
    }

    return (
      <div className="col-sm-2 text-right">
        <select
          value={quantity}
          name="quantity"
          className="standard-btn-no-margin"
          onChange={({ target: { value } }) =>
            handleChange(userId, orderId, id, cartItem, value)
          }
        >
          {arr1To10.map(element => {
            return (
              <option key={element} value={element}>
                {`${element}${element === 10 ? '+' : ''}`}
              </option>
            )
          })}
        </select>
        {['', '0'].includes(quantity) && (
          <small>Can only enter non-zero number. Field can not be empty</small>
        )}
        {quantityNotAllowed && (
          <small>{`We do NOT have ${quantity} ${name}s left`}</small>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateLineitem: (userId, orderId, lineitemId, lineitem) =>
      dispatch(updateLineitemThunk(userId, orderId, lineitemId, lineitem))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CartQuantitySelector)
