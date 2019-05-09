/* eslint-disable complexity */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUserThunk } from '../redux/actions/login'
import { getAllUserOrdersThunk } from '../redux/actions/userOrders'
import { getAllUsersLineitemsThunk } from '../redux/actions/userLineitems'
import Reviews from './Reviews'
import Orders from './Orders'

class SingleUser extends Component {
  componentDidMount() {
    const { userId } = this.props
    return Promise.all([
      this.props.getAllUserOrders(userId),
      this.props.getAllUsersLineitems(userId)
    ])
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
      logoutUser
    } = this.props
    let loggedIn
    if (user) loggedIn = user.id === loggedInUser.id ? loggedInUser.id : false
    if (!loggedIn) {
      return <Reviews user={user || {}} reviews={reviews} products={products} />
    }
    return (
      <div className="single-user">
        <button
          type="button"
          className="standard-btn"
          onClick={() => {
            logoutUser().then(() => history.push('/home'))
          }}
        >
          Logout
        </button>
        <div>
          <button
            type="button"
            className="standard-btn"
            onClick={() => history.push(`/users/${loggedIn}/orders`)}
          >
            Your orders
          </button>
          <button
            type="button"
            className="standard-btn"
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
    logoutUser: () => dispatch(logoutUserThunk()),
    getAllUserOrders: userId => dispatch(getAllUserOrdersThunk(userId)),
    getAllUsersLineitems: userId => dispatch(getAllUsersLineitemsThunk(userId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleUser)
