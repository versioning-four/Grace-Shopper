import axios from 'axios'

import { GET_IN_PROGRESS_ORDERS } from '../constants'

const getInProgressOrders = orders => ({
  type: GET_IN_PROGRESS_ORDERS,
  orders
})

export const getInProgressOrdersThunk = () => {
  return dispatch => {
    return axios
      .get('/api/orders/in-progress')
      .then(({ data }) => dispatch(getInProgressOrders(data)))
  }
}
