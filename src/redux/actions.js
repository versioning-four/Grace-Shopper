import axios from 'axios'
import { LOGGED_IN_USER, GET_ALL_PRODUCTS } from './constants'

//action creator
const getLoggedUser = user => ({
  type: LOGGED_IN_USER,
  user
})

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

//thunks
export const loginUserThunk = user => {
  return dispatch => {
    return axios
      .put('/api/users/login', user)
      .then(({ data }) => dispatch(getLoggedUser(data)))
  }
}

export const getAllProductsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(({ data }) => dispatch(getAllProducts(data)))
  }
}
