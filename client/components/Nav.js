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
<<<<<<< HEAD:src/components/Nav.js
    <div>
      <nav className="navbar">
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
      </nav>
    </div>
=======
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
>>>>>>> a133d944fc4159f4eeb4d88e79fa3d4336463dba:client/components/Nav.js
  )
}

const mapStateToProps = ({ loggedInUser }) => ({ loggedInUser })

export default connect(mapStateToProps)(Nav)
