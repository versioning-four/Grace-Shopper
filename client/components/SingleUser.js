/* eslint-disable complexity */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUserThunk } from '../redux/actions/login'
import { Link } from 'react-router-dom'

import { getAllUserOrdersThunk } from '../redux/actions/userOrders'
import { getAllUsersLineitemsThunk } from '../redux/actions/userLineitems'
import Reviews from './Reviews'
import Orders from './Orders'
import AdminPage from './AdminPage'

class SingleUser extends Component {
  componentDidMount() {
    if (this.props.loggedInUser.id) {
      const { loggedInUser } = this.props
      return Promise.all([
        this.props.getAllUserOrders(loggedInUser.id),
        this.props.getAllUsersLineitems(loggedInUser.id)
      ])
    }
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.loggedInUser
    if (
      !prevProps.loggedInUser.id &&
      id === Number(this.props.match.params.id)
    ) {
      return Promise.all([
        this.props.getAllUserOrders(id),
        this.props.getAllUsersLineitems(id)
      ])
    }
  }

  render() {
    const {
      reviews,
      user,
      products,
      loggedInUser,
      userProfileReviews,
      history,
      match,
      userOrders,
      logoutUser,
      pathname,
      userId
    } = this.props

    let loggedIn
    if (user) loggedIn = user.id === loggedInUser.id ? loggedInUser.id : false
    if (!loggedIn && !pathname.includes('myaccount')) {
      return <Reviews user={user || {}} reviews={reviews} products={products} />
    }

    if (!loggedIn && pathname.includes('myaccount')) {
      return (
        <div>
          You are not logged in. Go to the <Link to="/login">sign-in page</Link>{' '}
          to log in
        </div>
      )
    }

    if (loggedIn && loggedInUser.id !== userId) {
      return (
        <div>
          You trying to access somebody else's account :(. Go to the{' '}
          <Link to="/login">sign-in page</Link> to log in
        </div>
      )
    }

    return (
      <div className="single-user">
        <button
          type="button"
          className="remove-btn"
          onClick={() => {
            logoutUser().then(() => history.push('/home'))
          }}
        >
          Logout
        </button>
        <div>
          <Link to={`/users/${loggedIn}/myaccount/orders`}>
            <button type="button" className="standard-btn">
              Your orders
            </button>
          </Link>

          <Link to={`/users/${loggedIn}/myaccount/reviews`}>
            <button type="button" className="standard-btn">
              Your Reviews
            </button>
          </Link>

          <Link to={`/users/${loggedIn}/myaccount/admin`}>
            <button type="button" className="standard-btn">
              Admin Tools
            </button>
          </Link>
        </div>

        {match.params.filter === 'reviews' && (
          <Reviews
            user={user.id && user}
            reviews={userProfileReviews}
            products={products}
          />
        )}
        {match.params.filter === 'orders' && (
          <Orders user={user.id && user} userOrders={userOrders} />
        )}

        {match.params.filter === 'admin' && <AdminPage match={match} />}
      </div>
    )
  }
}

const mapStateToProps = (
  { reviews, users, products, loggedInUser, userOrders },
  { match: { params }, location: { pathname } }
) => {
  return {
    userOrders,
    userProfileReviews: reviews.filter(
      review => review.userId === loggedInUser.id
    ),
    reviews: reviews.filter(review => review.userId === Number(params.id)),
    user: loggedInUser.id
      ? loggedInUser
      : users.find(user => user.id === Number(params.id)),
    userId: Number(params.id),
    products,
    loggedInUser,
    pathname
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUserThunk()),
    getAllUserOrders: userId => dispatch(getAllUserOrdersThunk(userId)),
    getAllUsersLineitems: userId => dispatch(getAllUsersLineitemsThunk(userId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleUser)
