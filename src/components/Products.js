import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makePriceCurrencyFormat } from '../HelperFunctions'

class Products extends Component {
  render() {
    const { products } = this.props
    return (
      <div>
        {products.map(product => {
          const { id, name, price, image } = product
          return (
            <ul key={id}>
              <li>
                <img src={image} />
              </li>
              <li>
                {' '}
                <Link to={`/products/${id}`}>{name}</Link>{' '}
              </li>
              <li>{makePriceCurrencyFormat(price)}</li>
            </ul>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => ({ products })

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
