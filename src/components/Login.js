import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loginUserThunk } from '../redux/actions'

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

  handleSubmit = ev => {
    ev.preventDefault()
    const { history } = this.props

    this.props.login(this.state).then(() => history.push('/home'))
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

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginUserThunk(user))
})

export default connect(
  null,
  mapDispatchToProps
)(Login)
