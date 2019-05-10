import { createReducer } from 'reduxsauce'
import { TypesX } from './actions'

export const INITIAL_STATE = {
    isLoggedIn: JSON.parse(localStorage.getItem('token')),
}

export const logout = (state = INITIAL_STATE, action) => {

    localStorage.removeItem('token')

    return {        
        ...state,
        isLoggedIn: false
    }

}

export const loginSuccess = (state = INITIAL_STATE, action) => {

    localStorage.setItem('token', JSON.stringify(action.token))

    return {        
        ...state,
        isLoggedIn: true
    }

}

export const HANDLERS = {
    [TypesX.logout]: logout,
    [TypesX.loginSuccess]: loginSuccess,
}

export default createReducer(INITIAL_STATE, HANDLERS)
