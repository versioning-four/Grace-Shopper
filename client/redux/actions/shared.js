import axios from 'axios'
import { getOrderLineitemsThunk } from './cart'
import { setUserOrdersOnLogin } from './userOrders'

export const processAfterLoginThunk = (userId, newOrder) => {
  return async dispatch => {
    let order = await axios.get(`/api/users/${userId}/orders/cart`)
    if (!order) {
      order = await axios.post(`/api/users/${userId}/orders/cart`, newOrder)
    }
    dispatch(setUserOrdersOnLogin([order.data]))
    return dispatch(getOrderLineitemsThunk(userId, order.data.id))
  }
}
