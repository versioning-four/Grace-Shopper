import { createStore, combineReducers, applyMiddleware } from 'redux'
import {
  productReducer,
  loginReducer,
  cartReducer,
  userOrdersReducer
} from './reducer'
import thunk from 'redux-thunk'
import loggerMiddleware from 'redux-logger'

const reducer = combineReducers({
  products: productReducer,
  user: loginReducer,
  cart: cartReducer,
  userOrders: userOrdersReducer
})

const store = createStore(reducer, applyMiddleware(thunk, loggerMiddleware))

export default store
