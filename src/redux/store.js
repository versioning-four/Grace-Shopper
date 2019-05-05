import { createStore, combineReducers, applyMiddleware } from 'redux'
import {
  productReducer,
  categoryReducer,
  loginReducer,
  cartReducer,
  userOrdersReducer,
  reviewsReducer,
  usersReducer
} from './reducer'
import thunk from 'redux-thunk'
import loggerMiddleware from 'redux-logger'

const reducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  user: loginReducer,
  cart: cartReducer,
  userOrders: userOrdersReducer,
  reviews: reviewsReducer,
  users: usersReducer
})

const store = createStore(reducer, applyMiddleware(thunk, loggerMiddleware))

export default store
