import React from 'react'
import { connect } from 'react-redux'
import { addToCartThunk } from '../redux/actions'

const SingleProduct = ({ product }) => {
  const { id, description, name, price, image } = product
  return (
    <div>
      <div>
        <img src={image} />
      </div>
      <ul>
        <li>{name}</li>
        <li>{price}</li>
        <li>{description}</li>
      </ul>
      <button type="button">Add to cart</button>
    </div>
  )
}

const mapStateToProps = ({ products }, { match: { params } }) => {
  return {
    product:
      products.length &&
      products.find(product => product.id === Number(params.id))
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
