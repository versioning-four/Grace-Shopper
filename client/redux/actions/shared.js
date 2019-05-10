import axios from 'axios'
import { getOrderLineitemsThunk } from './cart'
import { setUserOrders } from './userOrders'

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
