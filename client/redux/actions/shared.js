import axios from 'axios'
import { getOrderLineitemsThunk, removeAllItemsFromCartThunk } from './cart'
import { setUserOrders } from './userOrders'
import { updateProductThunk } from './product'

export const processAfterHaveUserThunk = (userId, newOrder) => {
  return async dispatch => {
    if (userId) {
      let order = await axios.get(`/api/users/${userId}/orders/cart`)
      if (!order.data) {
        order = await axios.post(`/api/users/${userId}/orders`, newOrder)
      }
      dispatch(setUserOrders([order.data]))
      return dispatch(getOrderLineitemsThunk(userId, order.data.id))
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
