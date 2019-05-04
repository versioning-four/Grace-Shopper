import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { findProductNameById } from './App'

const SingleUser = props => {
  const { reviews, user, products } = props
  return (
    <div>
      <h1>Reviews</h1>
      <h4>by {user && `${user.firstName} ${user.lastName}`}</h4>

      {reviews.map(review => (
        <ul key={review.id}>
          <h4>
            <Link to={`/products/${review.productId}`}>
              {products.length &&
                findProductNameById(review.productId, products)}
            </Link>
          </h4>
          <h5>{review.title}</h5>
          <li>{review.rating} / 5 stars</li>
          <li>{review.content}</li>
        </ul>
      ))}
    </div>
  )
}

const mapStateToProps = (
  { reviews, users, products },
  { match: { params } }
) => {
  return {
    reviews: reviews.filter(review => review.userId === Number(params.id)),
    user: users.find(user => user.id === Number(params.id)),
    userId: Number(params.id),
    products
  }
}

export default connect(
  mapStateToProps,
  null
)(SingleUser)
