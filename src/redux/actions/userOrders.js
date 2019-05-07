import axios from 'axios'
import {
  CREATE_OR_FIND_ORDER,
  UPDATE_ORDER,
  GET_ALL_USER_ORDERS
} from '../constants'

const updateOrder = (orderId, order) => ({
  type: UPDATE_ORDER,
  orderId,
  order
})

const getAllUserOrders = orders => ({
  type: GET_ALL_USER_ORDERS,
  orders
})

export const createOrFindOrder = order => ({
  type: CREATE_OR_FIND_ORDER,
  order
})

export const getAllUserOrdersThunk = userId => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/orders`)
      .then(({ data }) => dispatch(getAllUserOrders(data)))
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
      .then(({ data }) => dispatch(createOrFindOrder(data)))
  }
}
