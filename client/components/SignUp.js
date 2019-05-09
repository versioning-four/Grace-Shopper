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
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          name="firstName"
          value={firstName}
          placeholder="First name"
          onChange={handleChange}
        />
        <label>Last Name</label>
        <input
          name="lastName"
          value={lastName}
          placeholder="Last name"
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          name="email"
          value={email}
          placeholder="Email"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleChange}
        />
        {error &&
          (Array.isArray(error) && (
            <ul>
              {error
                .filter(item => item.includes('notEmpty'))
                .map((e, idx) => (
                  <li key={idx}>
                    {e.includes('firstName') && `First name cannot be empty`}
                    {e.includes('lastName') && `Last name cannot be empty`}
                    {e.includes('email') && `Email cannot be empty`}
                    {e.includes('password') && `Password cannot be empty`}
                  </li>
                ))}
            </ul>
          ))}

        <button type="submit">Submit</button>
      </form>
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
