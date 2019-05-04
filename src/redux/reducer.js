import {
  LOGGED_IN_USER,
  GET_ALL_PRODUCTS,
  ADD_TO_CART,
  GET_ALL_USER_ORDERS,
  GET_ORDER_LINEITEMS,
  GET_ALL_REVIEWS,
  GET_ALL_USERS
} from './constants'

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return action.user
    default:
      return state
  }
}

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.lineitem]
    case GET_ORDER_LINEITEMS:
      return action.lineitems
    default:
      return state
  }
}

export const userOrdersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USER_ORDERS:
      return action.orders
    default:
      return state
  }
}

export const reviewsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS:
      return action.reviews
    default:
      return state
  }
}

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
