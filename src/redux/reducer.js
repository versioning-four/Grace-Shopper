import {
  LOGGED_IN_USER,
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  ADD_TO_CART,
  GET_ALL_USER_ORDERS,
  GET_ORDER_LINEITEMS,
  UPDATE_PRODUCT,
  UPDATE_LINE_ITEM,
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
    case UPDATE_PRODUCT:
      return state.map(product =>
        product.id === action.productId ? action.product : product
      )
    default:
      return state
  }
}

export const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories
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
    case UPDATE_LINE_ITEM:
      return state.map(item =>
        item.id === action.lineitemId ? action.lineitem : item
      )
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
