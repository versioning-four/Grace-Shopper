import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const navTabs = [
  { name: 'Home', path: '/home' },
  { name: 'Products', path: '/products' },
  { name: 'User', path: '/user' },
  { name: 'Cart', path: '/cart' }
]

const Nav = props => {
  const { user } = props
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
        <Link to={user.id ? '/logout' : '/login'}>
          {user.id ? 'Log Out' : 'Log In'}
        </Link>
      </li>
    </ul>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  null
)(Nav)
