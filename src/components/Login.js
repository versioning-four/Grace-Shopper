import React, { Component } from 'react'
import { connect } from 'react-redux'

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
      password: '',
      error: ''
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
          return order ? orderLineitems(user.id, order.id) : null
        })
        .then(() => history.push('/home'))
    }
  }

  handleSubmit = ev => {
    ev.preventDefault()

    return this.props
      .login(this.state)
      .catch(({ response: { data } }) => this.setState({ error: data.errors }))
  }

  render() {
    const { email, password, error } = this.state
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

        {error &&
          (Array.isArray(error) ? (
            <ul>
              {error.map((e, idx) => (
                <li key={idx}>{e}</li>
              ))}
            </ul>
          ) : (
            <div>{error[0]}</div>
          ))}

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

/*{error && (Array.isArray(error) ? (<ul>
  {error.map}

  </ul>) : <div>{error}</div>)}*/
