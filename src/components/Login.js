import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  loginUserThunk,
  getOrderLineitemsThunk,
  createOrFindOrderThunk
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
    const { history, loggedInUser, orderLineitems } = this.props
    if (prevProps.loggedInUser.id !== this.props.loggedInUser.id) {
      this.props
        .createOrFindOrder(loggedInUser.id, { loggedInUserId: loggedInUser.id })
        .then(({ order }) => {
          return orderLineitems(loggedInUser.id, order.id)
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
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginUserThunk(user)),
  orderLineitems: (userId, orderId) =>
    dispatch(getOrderLineitemsThunk(userId, orderId)),
  createOrFindOrder: (userId, newOrder) =>
    dispatch(createOrFindOrderThunk(userId, newOrder))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

/*{error && (Array.isArray(error) ? (<ul>
  {error.map}

  </ul>) : <div>{error}</div>)}*/
