// React
import { takeLatest, put } from 'redux-saga/effects'

// Helpers
import api from 'services/api'

// Redux
import { ActionsX, TypesX } from './actions'

export function* login(action) {
    try {

        const result = yield api.post(`auth/token`, {
            username: action.username,
            password: action.password
        })

        yield put(ActionsX.loginSuccess(result.data.token))

    } catch(e) {

        console.log(e.response)

    }
}

const saga = [
    takeLatest(TypesX.login, login),
]

export default saga
