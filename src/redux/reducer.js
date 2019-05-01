import { LOGGED_IN_USER, GET_ALL_PRODUCTS } from './constants'

export const loginReducer = ( state = {}, action) => {
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

