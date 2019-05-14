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
    let { data } = await axios.get('/api/auth')
    if (
      data.id &&
      /[0-9]+/.exec(window.location.hash) &&
      data.id !== Number(/[0-9]+/.exec(window.location.hash)[0])
    ) {
      data = {}
    }
    dispatch(setCurrentUser(data))
    return dispatch(processAfterHaveUserThunk(data.id, { userId: data.id }))
  }
}
