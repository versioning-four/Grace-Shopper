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
      .then(() => history.push(`/home`))
      .catch(({ response: { data } }) => this.setState({ error: data.errors }))
  }

  render() {
    const { email, password, error } = this.state
    const { handleChange, handleSubmit } = this
    const { history } = this.props

    return (
      <div className="login-form">
        <ul className="list-group">
          <div className="login-header">
            <h1>
              <img
                src="https://image.flaticon.com/icons/svg/1689/1689081.svg"
                width="60"
                height="60"
              />{' '}
              Versioning 4
            </h1>
            <br />
          </div>
          <div className="login-subheader">
            Log in to experience our state of the art farming products
          </div>
          <br />

          <form onSubmit={ev => handleSubmit(ev, this.props.history)}>
            <li className="list-group-item">
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                value={email}
                placeholder="Enter your email address"
                onChange={handleChange}
              />
            </li>

            <li className="list-group-item">
              <label>Password</label>
              <input
                className="form-control"
                name="password"
                value={password}
                placeholder="Enter your password"
                type="password"
                onChange={handleChange}
              />
            </li>

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

            <div className="login-buttons">
              <button type="submit" className="standard-btn">
                Log in
              </button>
              <button
                type="button"
                className="standard-btn"
                onClick={() => history.push(`/signup`)}
              >
                Sign Up
              </button>
            </div>
          </form>
        </ul>
      </div>
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
