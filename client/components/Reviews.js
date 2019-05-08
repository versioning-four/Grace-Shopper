import React from 'react'
import { Link } from 'react-router-dom'

import { findProductNameById } from '../HelperFunctions'

const Reviews = ({ user, reviews, products }) => {
  return (
    <div>
      <h1>Reviews</h1>
      <h4>by {`${user.firstName} ${user.lastName}`}</h4>

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

export default Reviews
