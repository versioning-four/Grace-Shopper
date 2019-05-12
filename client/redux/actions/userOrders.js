import axios from 'axios'
import { UPDATE_ORDER, CREATE_ORDER, SET_USER_ORDERS } from '../constants'

const updateOrder = (orderId, order) => ({
  type: UPDATE_ORDER,
  orderId,
  order
})

const createOrder = order => ({
  type: CREATE_ORDER,
  order
})

export const setUserOrders = orders => ({
  type: SET_USER_ORDERS,
  orders
})

export const resetUserOdersToEmpty = () => ({
  type: SET_USER_ORDERS,
  orders: []
})

export const getAllUserOrdersThunk = userId => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/orders`)
      .then(({ data }) => dispatch(setUserOrders(data)))
  }
}

export const updateOrderThunk = (userId, orderId, order) => {
  return dispatch => {
    return axios
      .put(`/api/users/${userId}/orders/${orderId}`, order)
      .then(({ data }) => dispatch(updateOrder(orderId, data)))
  }
}

export const createNewOrderThunk = (userId, newOrder) => {
  return dispatch => {
    axios
      .post(`/api/users/${userId}/orders`, newOrder)
      .then(({ data }) => dispatch(createOrder(data)))
  }
}
