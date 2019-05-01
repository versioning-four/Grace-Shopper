import axios from 'axios';

import { LOGGED_IN_USER } from './constants'
//action creator
const getLoggedUser = user => ({
    type: LOGGED_IN_USER,
    user
})

//thunks
const loginUserThunk = user => {
    return dispatch => {
        return axios.put('/login', user)
            .then(({ data }) => dispatch(getLoggedUser(data)))
    }
}

export {
    loginUserThunk,
    getLoggedUser
}
