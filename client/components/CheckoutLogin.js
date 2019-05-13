import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkoutAsGuestThunk } from '../redux/actions/shared'
import Login from './Login'

const CheckoutLogin = ({ cart, products, checkoutAsGuest }) => {
  return (
    <div>
      <Login />
      <div>
        or{' '}
        <Link
          to="/checkoutpage"
          onClick={() => checkoutAsGuest(cart, products)}
        >
          checkout as guest
        </Link>{' '}
      </div>
    </div>
  )
}

const mapStateToProps = ({ cart, products }) => ({ cart, products })

const mapDispatchToProps = dispatch => {
  return {
    checkoutAsGuest: (cart, products) =>
      dispatch(checkoutAsGuestThunk(cart, products))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutLogin)
