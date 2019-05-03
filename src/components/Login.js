import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../redux/store'

import {
  loginUserThunk,
  getAllUserOrdersThunk,
  getOrderLineitemsThunk
} from '../redux/actions'

class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value })
  }

  componentDidUpdate(prevProps) {
    const { history, user, orderLineitems } = this.props
    if (prevProps.user.id !== this.props.user.id) {
      this.props
        .userOrders(user.id)
        .then(({ orders }) => {
          return orders.find(order => order.status === 'pending')
        })
        .then(order => {
          console.log(order)
          return order ? orderLineitems(user.id, order.id) : null
        })
        .then(() => console.log(store.getState()))
        .then(() => history.push('/home'))
    }
  }

  handleSubmit = ev => {
    ev.preventDefault()

    return this.props.login(this.state)
  }

  render() {
    const { email, password } = this.state
    const { handleChange, handleSubmit } = this

    return (
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          name="email"
          value={email}
          placeholder="Enter your email address"
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={handleChange}
        />

        <button type="submit">Log in</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userOrdersState: state.userOrders
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginUserThunk(user)),
  userOrders: userId => dispatch(getAllUserOrdersThunk(userId)),
  orderLineitems: (userId, orderId) =>
    dispatch(getOrderLineitemsThunk(userId, orderId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
