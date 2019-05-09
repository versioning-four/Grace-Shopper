import axios from 'axios'
import { SET_CURRENT_USER } from '../constants'
import { processAfterHaveUserThunk } from './shared'
import { resetCartToEmpty } from './cart'
import { resetUserLineItemsToEmpty } from './userLineitems'
import { resetUserOdersToEmpty } from './userOrders'

const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
})

export const logoutUserThunk = () => {
  return dispatch => {
    return axios
      .delete('/api/auth')
      .then(() => {
        dispatch(setCurrentUser({}))
      })
      .then(() =>
        Promise.all([
          dispatch(resetCartToEmpty()),
          dispatch(resetUserLineItemsToEmpty()),
          dispatch(resetUserOdersToEmpty())
        ])
      )
  }
}

export const loginUserThunk = user => {
  return async dispatch => {
    const { data } = await axios.put('/api/auth/login', user)
    dispatch(setCurrentUser(data))
    return dispatch(processAfterHaveUserThunk(data.id, { userId: data.id }))
  }
}

export const checkForUserThunk = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/auth')
    dispatch(setCurrentUser(data))
    return dispatch(processAfterHaveUserThunk(data.id, { userId: data.id }))
  }
}
