import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const navTabs = [
  { name: 'Home', path: '/home' },
  { name: 'Products', path: '/products' },
  { name: 'Cart', path: '/cart' }
]

const Nav = ({ loggedInUser }) => {
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
        <Link to={loggedInUser.id ? `/users/${loggedInUser.id}` : '/login'}>
          {loggedInUser.id ? 'My Account' : 'Log In'}
        </Link>
      </li>
    </ul>
  )
}

const mapStateToProps = ({ loggedInUser }) => ({ loggedInUser })

export default connect(mapStateToProps)(Nav)
