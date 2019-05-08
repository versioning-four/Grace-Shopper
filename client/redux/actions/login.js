import axios from 'axios'
import { SET_CURRENT_USER } from '../constants'

const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
})

export const loginUserThunk = user => {
  return dispatch => {
    return axios.put('/api/auth/login', user).then(({ data }) => {
      dispatch(setCurrentUser(data))
    })
  }
}

export const logoutUserThunk = () => {
  return dispatch => {
    return axios.delete('/api/auth').then(() => {
      dispatch(setCurrentUser({}))
    })
  }
}

export const checkForUserThunk = () => {
  return dispatch => {
    return axios
      .get('/api/auth')
      .then(({ data }) => dispatch(setCurrentUser(data)))
  }
}
