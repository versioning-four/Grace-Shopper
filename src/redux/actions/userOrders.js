import axios from 'axios'
import {
  UPDATE_ORDER,
  CREATE_ORDER,
  SET_USER_ORDERS,
  SET_USER_ORDERS_ON_LOGIN
} from '../constants'

const updateOrder = (orderId, order) => ({
  type: UPDATE_ORDER,
  orderId,
  order
})

const setUserOrders = orders => ({
  type: SET_USER_ORDERS,
  orders
})

export const setUserOrdersOnLogin = orders => ({
  type: SET_USER_ORDERS_ON_LOGIN,
  orders
})

export const createOrder = order => ({
  type: CREATE_ORDER,
  order
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

export const createNewOrderThunk = userId => {
  return dispatch => {
    axios
      .post(`/api/users/${userId}/orders`, { userId })
      .then(({ data }) => dispatch(createOrder(data)))
  }
}
