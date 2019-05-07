import { createReducer } from 'reduxsauce'
import { TypesX } from './actions'

export const INITIAL_STATE = {
    history: null,
    error: 0,
    url: null,
}

export const history = (state = INITIAL_STATE, action) => {
    return {        
        ...state,
        history: action.history
    }
}

export const error = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: action.error
    }
}

export const goTo = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        url: action.url
    }
}

export const HANDLERS = {
    [TypesX.history]: history,
    [TypesX.error]: error,
    [TypesX.goTo]: goTo,
}

export default createReducer(INITIAL_STATE, HANDLERS)
