import React, { Component } from 'react'
import { connect } from 'react-redux'
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

  handleSubmit = (ev, history) => {
    ev.preventDefault()

    return this.props
      .login(this.state)
      .then(() => history.push(`/products`))
      .catch(({ response: { data } }) => this.setState({ error: data.errors }))
  }

  render() {
    const { email, password, error } = this.state
    const { handleChange, handleSubmit } = this

    return (
      <form onSubmit={ev => handleSubmit(ev, this.props.history)}>
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

const mapStateToProps = ({ loggedInUser }) => ({ loggedInUser })

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginUserThunk(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
