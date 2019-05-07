import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const navTabs = [
  { name: 'Home', path: '/home' },
  { name: 'Products', path: '/products' },
  { name: 'User', path: '/users/1' },
  { name: 'Cart', path: '/cart' }
]

const Nav = props => {
  const { loggedInUser } = props
  return (
    <ul>
      {navTabs.map(tab => {
        return (
          <Link key={tab.name} to={tab.path}>
            <li>{tab.name}</li>
          </Link>
        )
      })}
      <li>
        <Link to={loggedInUser.id ? '/logout' : '/login'}>
          {loggedInUser.id ? 'Log Out' : 'Log In'}
        </Link>
      </li>
    </ul>
  )
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  }
}

export default connect(
  mapStateToProps,
  null
)(Nav)
