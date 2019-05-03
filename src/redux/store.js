import { createStore, combineReducers, applyMiddleware } from 'redux'
import {
  productReducer,
  loginReducer,
  cartReducer,
  userOrdersReducer
} from './reducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  products: productReducer,
  user: loginReducer,
  cart: cartReducer,
  userOrders: userOrdersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
