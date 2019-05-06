import axios from 'axios'
import {
  GET_ALL_PRODUCTS,
  GET_ALL_USER_ORDERS,
  GET_ORDER_LINEITEMS,
  ADD_TO_CART,
  GET_ALL_CATEGORIES,
  UPDATE_LINE_ITEM,
  UPDATE_PRODUCT,
  LOGGED_IN_USER,
  GET_ALL_USERS,
  GET_ALL_REVIEWS,
  CREATE_OR_FIND_ORDER,
  UPDATE_ORDER,
  RESET_CART_TO_EMPTY,
  REMOVE_FROM_CART
} from './constants'

//action creator
const createOrFindOrder = order => ({
  type: CREATE_OR_FIND_ORDER,
  order
})

const getLoggedUser = user => ({
  type: LOGGED_IN_USER,
  user
})

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const getAllCategories = categories => ({
  type: GET_ALL_CATEGORIES,
  categories
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

const updateLineitem = (lineitemId, lineitem) => ({
  type: UPDATE_LINE_ITEM,
  lineitemId,
  lineitem
})

const updateProduct = (productId, product) => ({
  type: UPDATE_PRODUCT,
  productId,
  product
})

const getAllReviews = reviews => ({
  type: GET_ALL_REVIEWS,
  reviews
})

const getAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

const updateOrder = (orderId, order) => ({
  type: UPDATE_ORDER,
  orderId,
  order
})

export const resetCartToEmpty = () => ({ type: RESET_CART_TO_EMPTY })

//thunks

//products thunks

export const getAllProductsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(({ data }) => dispatch(getAllProducts(data)))
  }
}

export const updateProductThunk = (productId, product) => {
  return dispatch => {
    return axios
      .put(`/api/products/${productId}`, product)
      .then(({ data }) => dispatch(updateProduct(productId, data)))
  }
}

//categories thunks

export const getAllCategoriesThunk = () => {
  return dispatch => {
    return axios
      .get('/api/categories')
      .then(({ data }) => dispatch(getAllCategories(data)))
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

export const createOrFindOrderThunk = (userId, newOrder) => {
  return dispatch => {
    return axios
      .post(`/api/users/${userId}/orders`, newOrder)
      .then(({ data }) => dispatch(createOrFindOrder(data)))
  }
}

export const updateOrderThunk = (userId, orderId, order) => {
  return dispatch => {
    return axios
      .put(`/api/users/${userId}/orders/${orderId}`, order)
      .then(({ data }) => dispatch(updateOrder(orderId, data)))
  }
}

//lineitems/cart thunks

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
        console.log('here')
        dispatch(getOrderLineitemsThunk(userId, orderId))
      })
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
