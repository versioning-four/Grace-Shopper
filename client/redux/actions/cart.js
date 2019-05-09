import axios from 'axios'
import {
  GET_ORDER_LINEITEMS,
  ADD_TO_CART,
  UPDATE_LINE_ITEM,
  RESET_CART_TO_EMPTY
} from '../constants'

const getOrderLineitems = lineitems => ({
  type: GET_ORDER_LINEITEMS,
  lineitems
})

const addToCart = lineitem => ({
  type: ADD_TO_CART,
  lineitem
})

const updateLineitem = (lineitemId, lineitem) => ({
  type: UPDATE_LINE_ITEM,
  lineitemId,
  lineitem
})

export const resetCartToEmpty = () => ({ type: RESET_CART_TO_EMPTY })

export const getOrderLineitemsThunk = (userId, orderId) => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/orders/${orderId}/lineitems`)
      .then(({ data }) => dispatch(getOrderLineitems(data)))
  }
}

export const addToCartThunk = (userId, orderId, lineitem) => {
  return dispatch => {
    return axios
      .post(`/api/users/${userId}/orders/${orderId}/lineitems`, lineitem)
      .then(({ data }) => dispatch(addToCart(data)))
  }
}

export const updateLineitemThunk = (userId, orderId, lineitemid, lineitem) => {
  return dispatch => {
    return axios
      .put(
        `/api/users/${userId}/orders/${orderId}/lineitems/${lineitemid}`,
        lineitem
      )
      .then(({ data }) => dispatch(updateLineitem(lineitemid, data)))
  }
}

export const removeFromCartThunk = (userId, orderId, lineitemId) => {
  return dispatch => {
    return axios
      .delete(`/api/users/${userId}/orders/${orderId}/lineitems/${lineitemId}`)
      .then(() => {
        dispatch(getOrderLineitemsThunk(userId, orderId))
      })
  }
}

export const removeAllItemsFromCartThunk = (userId, orderId) => {
  return dispatch => {
    return axios
      .delete(`/api/users/${userId}/orders/${orderId}/lineitems`)
      .then(() => dispatch(resetCartToEmpty()))
  }
}
