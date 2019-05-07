import axios from 'axios'
import { getOrderLineitemsThunk } from './cart'
import { createOrFindOrder } from './userOrders'

export const processAfterLoginThunk = (userId, newOrder) => {
  return async dispatch => {
    const order = await axios.post(`/api/users/${userId}/orders`, newOrder)
    dispatch(createOrFindOrder(order.data))
    return dispatch(getOrderLineitemsThunk(userId, order.data.id))
  }
}
