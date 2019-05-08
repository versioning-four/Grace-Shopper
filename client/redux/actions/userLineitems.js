import axios from 'axios'
import { SET_USER_LINEITEMS } from '../constants'

//action creator
const getUsersLineitems = lineitems => ({
  type: SET_USER_LINEITEMS,
  lineitems
})

export const resetUserLineItemsToEmpty = () => ({
  type: SET_USER_LINEITEMS,
  lineitems: []
})

export const getAllUsersLineitemsThunk = userId => {
  return dispatch => {
    return axios
      .get(`/api/users/${userId}/lineitems`)
      .then(({ data }) => dispatch(getUsersLineitems(data)))
  }
}
