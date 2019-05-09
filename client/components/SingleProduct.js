import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makePriceCurrencyFormat, findUserNameById } from '../HelperFunctions'
import AddToCartButton from './addToCartButton'

const SingleProduct = props => {
  const { description, name, price, image } = props.product
  const { reviews, users } = props
  return (
    <div className="single-product">
      <div className="single-product-card">
        <div>
          <img src={image} className="single-product-img" />
        </div>
        <ul>
          <h3>{name}</h3>
          <li>{makePriceCurrencyFormat(price)}</li>
          <li>{description}</li>
        </ul>
      </div>
      <ul className="reviews-card">
        <h3>Reviews</h3>
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
