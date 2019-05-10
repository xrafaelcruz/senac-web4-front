import { createActions } from 'reduxsauce'

const actions = {
    login: ['username', 'password'],
    logout: null,
    loginSuccess: ['token']
}

export const { Types, Creators } = createActions({ ...actions })

export const ActionsX = {
    login: Creators.login,
    logout: Creators.logout,
    loginSuccess: Creators.loginSuccess,
}

export const TypesX = {
    login: Types['LOGIN'],
    logout: Types['LOGOUT'],
    loginSuccess: Types['LOGIN_SUCCESS'],
}

export default ActionsX
