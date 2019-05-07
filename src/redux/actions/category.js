import axios from 'axios'
import { GET_ALL_CATEGORIES } from '../constants'

const getAllCategories = categories => ({
  type: GET_ALL_CATEGORIES,
  categories
})

export const getAllCategoriesThunk = () => {
  return dispatch => {
    return axios
      .get('/api/categories')
      .then(({ data }) => dispatch(getAllCategories(data)))
  }
}
