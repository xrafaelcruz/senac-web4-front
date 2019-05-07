import { createActions } from 'reduxsauce'

const actions = {
    history: ['history'],
    error: ['error', 'options'],
    goTo: ['url'],
}

export const { Types, Creators } = createActions({ ...actions })

export const ActionsX = {
    history: Creators.history,
    error: Creators.error,
    goTo: Creators.goTo,
}

export const TypesX = {
    history: Types['HISTORY'],
    error: Types['ERROR'],
    goTo: Types['GO_TO'],
}

export default ActionsX
