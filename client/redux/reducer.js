import {
  SET_CURRENT_USER,
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  ADD_TO_CART,
  GET_ORDER_LINEITEMS,
  UPDATE_PRODUCT,
  UPDATE_LINE_ITEM,
  GET_ALL_REVIEWS,
  GET_ALL_USERS,
  SET_USER_ORDERS,
  UPDATE_ORDER,
  RESET_CART_TO_EMPTY,
  GET_USER_LINEITEMS,
  CREATE_ORDER
} from './constants'

export const userLineitemsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USER_LINEITEMS:
      return action.lineitems
    default:
      return state
  }
}

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
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
    case RESET_CART_TO_EMPTY:
      return []
    default:
      return state
  }
}

export const userOrdersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USER_ORDERS:
      return action.orders
    case CREATE_ORDER:
      return [...state, action.order]
    case UPDATE_ORDER:
      return state.map(order =>
        order.id === action.orderId ? action.order : order
      )
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
