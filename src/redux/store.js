import { createStore, combineReducers, applyMiddleware } from 'redux'
import { productReducer, loginReducer } from './reducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  products: productReducer,
  user: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
