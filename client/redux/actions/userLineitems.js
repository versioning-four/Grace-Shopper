import axios from 'axios'
import { GET_USER_LINEITEMS } from '../constants'

//action creator
const getUsersLineitems = lineitems => ({
  type: GET_USER_LINEITEMS,
  lineitems
})

export const getAllUsersLineitemsThunk = userId => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/lineitems`)
      .then(({ data }) => dispatch(getUsersLineitems(data)))
  }
}
