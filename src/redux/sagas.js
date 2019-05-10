import { all } from 'redux-saga/effects'

import login from 'partials/Login/redux/saga'

export default function *sagas() {
    yield all([
        ...login
    ])
}
