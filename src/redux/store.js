import { createStore, combineReducers, applyMiddleware } from 'redux'
import { productReducer } from './reducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({ products: productReducer })

const store = createStore(reducer, applyMiddleware(thunk))

export default store
