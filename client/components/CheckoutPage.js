import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  return (
    <div>
      Thank you for ordering with us. You may or may not receive the order. In
      the meantine, continue to browse our
      <Link to="/products"> products</Link>{' '}
    </div>
  )
}

export default CheckoutPage
