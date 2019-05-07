import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { logoutUserThunk } from '../redux/actions'
import { findProductNameById } from '../HelperFunctions'
import Reviews from './Reviews'
import Orders from './Orders'

const SingleUser = props => {
  const {
    reviews,
    user,
    products,
    loggedInUser,
    userProfileReviews,
    history,
    match,
    userOrders,
    logoutUser
  } = props
  console.log('user', user)
  let loggedIn
  if (user) loggedIn = user.id === loggedInUser.id ? loggedInUser.id : false
  if (!loggedIn) {
    return (
      <Reviews user={user.id && user} reviews={reviews} products={products} />
    )
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          logoutUser().then(() => history.push('/home'))
        }}
      >
        Logout
      </button>
      <div>
        <button
          type="button"
          onClick={() => history.push(`/users/${loggedIn}/orders`)}
        >
          Your orders
        </button>
        <button
          type="button"
          onClick={() => history.push(`/users/${loggedIn}/reviews`)}
        >
          Your Reviews
        </button>
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
    </div>
  )
}

const mapStateToProps = (
  { reviews, users, products, loggedInUser, userOrders },
  { match: { params } }
) => {
  return {
    userOrders,
    userProfileReviews: reviews.filter(
      review => review.userId === loggedInUser.id
    ),
    reviews: reviews.filter(review => review.userId === Number(params.id)),
    user: users.find(user => user.id === Number(params.id)),
    userId: Number(params.id),
    products,
    loggedInUser
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUserThunk())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleUser)
