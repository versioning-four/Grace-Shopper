import { LOGGED_IN_USER } from './constants'

const loginReducer = ( state = {}, action) => {

    switch (action.type) {
        case LOGGED_IN_USER:
            return {...state, user: action.user}
        default:
            return state
    }
}

export {
    loginReducer
}
