import axios from 'axios'
import {
  GET_ALL_PRODUCTS,
  GET_ALL_USER_ORDERS,
  GET_ORDER_LINEITEMS,
  ADD_TO_CART,
  LOGGED_IN_USER,
  GET_ALL_USERS,
  GET_ALL_REVIEWS
} from './constants'

//action creator
const getLoggedUser = user => ({
  type: LOGGED_IN_USER,
  user
})

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const addToCart = lineitem => ({
  type: ADD_TO_CART,
  lineitem
})

const getAllUserOrders = orders => ({
  type: GET_ALL_USER_ORDERS,
  orders
})

const getOrderLineitems = lineitems => ({
  type: GET_ORDER_LINEITEMS,
  lineitems
})

const getAllReviews = reviews => ({
  type: GET_ALL_REVIEWS,
  reviews
})

const getAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

//thunks

//products thunks

export const getAllProductsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(({ data }) => dispatch(getAllProducts(data)))
  }
}

//orders thunks

export const getAllUserOrdersThunk = userId => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/orders`)
      .then(({ data }) => dispatch(getAllUserOrders(data)))
  }
}

export const getOrderLineitemsThunk = (userId, orderId) => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/orders/${orderId}/lineitems`)
      .then(({ data }) => dispatch(getOrderLineitems(data)))
  }
}

export const addToCartThunk = (userId, lineitem) => {
  const { orderId } = lineitem
  return dispatch => {
    return axios
      .post(`/api/users/${userId}/orders/${orderId}/lineitem`, lineitem)
      .then(({ data }) => dispatch(addToCart(data)))
  }
}

//users thunks

export const loginUserThunk = user => {
  return dispatch => {
    return axios.put('/api/users/login', user).then(({ data }) => {
      dispatch(getLoggedUser(data))
    })
  }
}

export const getAllUsersThunk = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(({ data }) => dispatch(getAllUsers(data)))
  }
}

//reviews thunks

export const getAllReviewsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/reviews/')
      .then(({ data }) => dispatch(getAllReviews(data)))
  }
}
