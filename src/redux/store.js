import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import logger from 'redux-logger' // Exibe no console um log dos states

import reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) // Descobre quem chamou a action

const store = createStore(
    reducers, 
    composeEnhancers ? composeEnhancers(applyMiddleware(sagaMiddleware)) : applyMiddleware(sagaMiddleware)
    // applyMiddleware(sagaMiddleware, logger),
)

sagaMiddleware.run(sagas)

export default store
