import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCartThunk } from '../redux/actions'
import { makePriceCurrencyFormat, findUserNameById } from '../HelperFunctions'
import AddToCartButton from './AddToCartButton'

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

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (userId, product) => dispatch(addToCartThunk(userId, product))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct)
