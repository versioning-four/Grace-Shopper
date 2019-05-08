import axios from 'axios'
import { GET_ALL_REVIEWS } from '../constants'

const getAllReviews = reviews => ({
  type: GET_ALL_REVIEWS,
  reviews
})

export const getAllReviewsThunk = () => {
  return dispatch => {
    return axios
      .get('/api/reviews/')
      .then(({ data }) => dispatch(getAllReviews(data)))
  }
}
