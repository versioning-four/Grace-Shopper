import { GET_ALL_PRODUCTS } from './constants'
import axios from 'axios'

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

export const getAllProductsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(({ data }) => dispatch(getAllProducts(data)))
  }
}
