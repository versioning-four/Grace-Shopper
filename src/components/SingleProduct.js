import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCartThunk } from '../redux/actions'
import { makePriceCurrencyFormat } from '../HelperFunctions'
import { findUserNameById } from './App'
import AddToCartButton from './AddToCartButton'

const SingleProduct = props => {
  const { description, name, price, image } = props.product
  const { reviews, users, productInCart } = props
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
      <AddToCartButton product={props.product} />

      {productInCart && (
        <small>
          Item already in cart. Go to <Link to="/cart">cart</Link> to change
          quantity
        </small>
      )}
    </div>
  )
}

const mapStateToProps = (
  { products, reviews, users, cart },
  { match: { params } }
) => {
  const product =
    products.length && products.find(p => p.id === Number(params.id))
  return {
    product,
    reviews: reviews.filter(review => review.productId === Number(params.id)),
    users,
    productInCart: cart.map(item => item.productId).includes(product.id)
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
