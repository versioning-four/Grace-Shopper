import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const navTabs = [
  { name: 'Home', path: '/home' },
  { name: 'Products', path: '/products' },
  { name: 'Cart', path: '/cart' }
]

const Nav = ({ loggedInUser, location: { pathname } }) => {
  const usersMatch =
    !pathname.includes('myaccount') ||
    loggedInUser.id === Number(/[0-9]+/.exec(pathname)[0])
  const showLoggedIn = loggedInUser.id && usersMatch
  return (
    <nav className="navbar navbar-expand-md navbar-light fixed-top">
      <Link className="navbar-brand" to="/home">
        <img
          src="https://image.flaticon.com/icons/svg/1689/1689081.svg"
          width="60"
          height="60"
        />
      </Link>
      <ul className="navbar-nav mr-auto nav-menu">
        {navTabs.map(tab => {
          return (
            <Link className="nav-link" key={tab.name} to={tab.path}>
              <li className="nav-item">{tab.name}</li>
            </Link>
          )
        })}
      </ul>
      <ul className="navbar-nav nav-login">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={showLoggedIn ? `/users/${loggedInUser.id}/myaccount` : '/login'}
          >
            {showLoggedIn ? 'My Account' : 'Log In'}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

const mapStateToProps = ({ loggedInUser }) => ({ loggedInUser })

export default connect(mapStateToProps)(Nav)
