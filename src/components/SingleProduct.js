import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCartThunk } from '../redux/actions'
import { makePriceCurrencyFormat } from '../HelperFunctions'
import { findUserNameById } from './App'

const SingleProduct = props => {
  const { id, description, name, price, image } = props.product
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
        {reviews.length &&
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
          ))}
      </ul>
      <button type="button">Add to cart</button>
    </div>
  )
}

const mapStateToProps = (
  { products, reviews, users },
  { match: { params } }
) => {
  return {
    product:
      products.length &&
      products.find(product => product.id === Number(params.id)),
    reviews: reviews.filter(review => review.productId === Number(params.id)),
    users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (userId, lineitem) => dispatch(addToCartThunk(userId, lineitem))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct)
