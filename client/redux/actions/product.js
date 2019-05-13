import axios from 'axios'
import { GET_ALL_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT } from '../constants'

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const updateProduct = (productId, product) => ({
  type: UPDATE_PRODUCT,
  productId,
  product
})

export const getAllProductsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(({ data }) => dispatch(getAllProducts(data)))
  }
}

export const updateProductThunk = (productId, product) => {
  return dispatch => {
    return axios
      .put(`/api/products/${productId}`, product)
      .then(({ data }) => dispatch(updateProduct(productId, data)))
  }
}

export const deleteProductThunk = productId => {
  return dispatch => {
    return axios
      .delete(`/api/products/${productId}`)
      .then(() => dispatch(getAllProductsThunk()))
  }
}
