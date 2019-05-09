import { createStore, combineReducers, applyMiddleware } from 'redux'
import {
  productReducer,
  categoryReducer,
  loginReducer,
  cartReducer,
  userOrdersReducer,
  reviewsReducer,
  usersReducer,
  userLineitemsReducer,
  inProgressOrdersReducer
} from './reducer'
import thunk from 'redux-thunk'
import loggerMiddleware from 'redux-logger'

const reducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  loggedInUser: loginReducer,
  cart: cartReducer,
  userOrders: userOrdersReducer,
  reviews: reviewsReducer,
  users: usersReducer,
  userLineitems: userLineitemsReducer,
  inProgressOrdersReducer
})

let middlewares = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(loggerMiddleware)
}

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
