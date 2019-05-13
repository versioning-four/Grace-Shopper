import axios from 'axios'

import { COMPLETE_ORDER } from '../constants'

const completeOrder = order => ({
  type: COMPLETE_ORDER,
  order
})

export const completeOrderThunk = (orderId, status) => {
  return dispatch => {
    return axios
      .put(`/api/orders/${orderId}`, status)
      .then(({ data }) => dispatch(completeOrder(data)))
      .catch(err => console.error(err))
  }
}
