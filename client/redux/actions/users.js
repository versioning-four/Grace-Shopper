import axios from 'axios'
import { GET_ALL_USERS } from '../constants'

const getAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

export const getAllUsersThunk = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(({ data }) => dispatch(getAllUsers(data)))
  }
}
