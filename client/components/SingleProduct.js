import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makePriceCurrencyFormat, findUserNameById } from '../HelperFunctions'
<<<<<<< HEAD:src/components/SingleProduct.js
<<<<<<< HEAD
import AddToCartButton from './AddToCartButton'
=======
import AddToCartButton from './addToCartButton'
>>>>>>> 93f6df2cfb342789a7ce639eacf56694fcf441a7
=======
import AddToCartButton from './addToCartButton'
>>>>>>> a133d944fc4159f4eeb4d88e79fa3d4336463dba:client/components/SingleProduct.js

const SingleProduct = props => {
  const { description, name, price, image } = props.product
  const { reviews, users } = props
  return (
    <div>
      <div>
        <img src={image} />
      </div>
      <ul>
        <li>{name}</li>
        <li>{makePriceCurrencyFormat(price)}</li>
        <li>{description}</li>
      </ul>
      <ul>
        <h1>Reviews</h1>
        {reviews.length ? (
          users.length &&
          reviews.map(review => (
            <ul key={review.id}>
              <h5> {review.title}</h5>
              <li> {review.rating} / 5 stars</li>
              <li>
                by{' '}
                <Link to={`/users/${review.userId}`}>
                  {' '}
                  {findUserNameById(review.userId, users)}
                </Link>
              </li>
              <li>{review.content}</li>
            </ul>
          ))
        ) : (
          <div>No reviews</div>
        )}
      </ul>
      <AddToCartButton product={props.product} />
    </div>
  )
}

const mapStateToProps = (
  { products, reviews, users },
  { match: { params } }
) => {
  return {
    product: products.length && products.find(p => p.id === Number(params.id)),
    reviews: reviews.filter(review => review.productId === Number(params.id)),
    users
  }
}

export default connect(mapStateToProps)(SingleProduct)