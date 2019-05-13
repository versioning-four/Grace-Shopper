import axios from 'axios'
import { getOrderLineitemsThunk, removeAllItemsFromCartThunk } from './cart'
import { setUserOrders } from './userOrders'
import {
  getOrderLineitemsThunk,
  removeAllItemsFromCartThunk,
  resetCartToEmpty
} from './cart'
import {
  setUserOrders,
  updateOrderThunk,
  createNewOrderThunk
} from './userOrders'
import { updateProductThunk } from './product'

export const processAfterHaveUserThunk = (userId, newOrder) => {
  return async dispatch => {
    if (userId) {
      let orders = await axios.get(`/api/users/${userId}/orders`)
      orders = orders.data
      let cartOrder = orders.find(order => order.status === 'cart')
      if (!cartOrder) {
        const cartAPICall = await axios.post(
          `/api/users/${userId}/orders`,
          newOrder
        )
        cartOrder = cartAPICall.data
        orders = [...orders, cartOrder]
      }
      dispatch(setUserOrders(orders))
      return dispatch(getOrderLineitemsThunk(userId, cartOrder.id))
    } else {
      return dispatch(getOrderLineitemsThunk(0, 0))
    }
  }
}

export const checkoutAsGuestThunk = (cart, products) => {
  return async dispatch => {
    const { data } = await axios.post('/api/users/0/orders', {
      status: 'in-progress'
    })

    await Promise.all(
      cart.map(item =>
        axios.post('/api/lineitems', {
          orderId: data.id,
          quantity: item.quantity,
          productId: item.productId
        })
      )
    )

    await Promise.all(
      cart.map(item => {
        const selectedProduct = products.find(
          product => product.id === item.productId
        )
        return dispatch(
          updateProductThunk(selectedProduct.id, {
            ...selectedProduct,
            inventoryQuantity: selectedProduct.inventoryQuantity - item.quantity
          })
        )
      })
    )
    dispatch(removeAllItemsFromCartThunk(0, 0))
  }
}

export const checkoutAsUserThunk = (
  user,
  currentOrder,
  cart,
  products,
  history
) => {
  return dispatch => {
    if (!user.id) {
      return history.push('/checkoutlogin')
    }

    return Promise.all([
      dispatch(
        updateOrderThunk(user.id, currentOrder.id, {
          ...currentOrder,
          status: 'in-progress'
        })
      ).then(() => dispatch(createNewOrderThunk(user.id, { userId: user.id }))),
      cart.map(item => {
        const selectedProduct = products.find(
          product => product.id === item.productId
        )
        return dispatch(
          updateProductThunk(selectedProduct.id, {
            ...selectedProduct,
            inventoryQuantity: selectedProduct.inventoryQuantity - item.quantity
          })
        )
      })
    ])
      .then(() => history.push('/checkoutpage'))
      .then(() => dispatch(resetCartToEmpty()))
      .then(() =>
        axios.post(
          `/mail/orderconfirmation/${user.firstName}/${user.email}/${user.id}`,
          cart
        )
      )
  }
}