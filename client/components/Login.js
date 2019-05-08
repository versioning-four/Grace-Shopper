import React, { Component } from 'react'
import { connect } from 'react-redux'

import { processAfterLoginThunk } from '../redux/actions/shared'
import { loginUserThunk } from '../redux/actions/login'

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
    const { history, loggedInUser } = this.props
    if (prevProps.loggedInUser.id !== this.props.loggedInUser.id) {
      return this.props
        .processAfterLogin(loggedInUser.id, { userId: loggedInUser.id })
        .then(() => history.push(`/users/${loggedInUser.id}`))
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
    const { history } = this.props

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
        <button type="button" onClick={() => history.push(`/signup`)}>
          Sign Up
        </button>
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
  processAfterLogin: (userId, newOrder) =>
    dispatch(processAfterLoginThunk(userId, newOrder))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
