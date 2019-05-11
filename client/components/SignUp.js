import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUpThunk } from '../redux/actions/users'
import { loginUserThunk } from '../redux/actions/login'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: []
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const { history, signUp, login } = this.props

    signUp(this.state)
      .then(() => login(this.state))
      .then(() => {
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          error: []
        })
        history.push(`/home`)
      })
      .catch(({ response: { data } }) => this.setState({ error: data.errors }))
  }

  render() {
    const { firstName, lastName, email, password, error } = this.state
    const { handleChange, handleSubmit } = this

    return (
      <div className="login-form">
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
          Sign up to keep up-to-date on all of our new offerings
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <ul className="list-group">
            <li className="list-group-item">
              <label>First Name</label>
              <input
                className="form-control"
                name="firstName"
                value={firstName}
                placeholder="First name"
                onChange={handleChange}
              />
            </li>
            <li className="list-group-item">
              <label>Last Name</label>
              <input
                className="form-control"
                name="lastName"
                value={lastName}
                placeholder="Last name"
                onChange={handleChange}
              />
            </li>
            <li className="list-group-item">
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleChange}
              />
            </li>
            <li className="list-group-item">
              <label>Password</label>
              <input
                className="form-control"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleChange}
              />
            </li>
          </ul>
          {error &&
            (Array.isArray(error) && (
              <ul className="errors">
                {error
                  .filter(item => item.includes('notEmpty'))
                  .map((e, idx) => (
                    <li key={idx}>
                      {e.includes('firstName') && `First name is required`}
                      {e.includes('lastName') && `Last name is required`}
                      {e.includes('email') && `Email is required`}
                      {e.includes('password') && `Password is required`}
                    </li>
                  ))}
              </ul>
            ))}
          <div className="login-buttons">
            <button type="submit" className="standard-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUp: user => dispatch(signUpThunk(user)),
  login: user => dispatch(loginUserThunk(user))
})

export default connect(
  null,
  mapDispatchToProps
)(SignUp)
