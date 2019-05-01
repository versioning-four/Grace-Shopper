import React from 'react'
import { connect } from 'react-redux'

const SingleProduct = ({ product }) => {
  const { description, name, price, image } = product
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

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct)
