import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducer/rootReducer'

import logger from 'redux-logger'
import thunk from 'redux-thunk'

import createSagaMiddle from 'redux-saga'
import rootSaga from './saga/rootSaga'

import {persistStore} from 'redux-persist'


const sagaMiddleware = createSagaMiddle()
export const middlewares = [thunk, sagaMiddleware,logger]

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default {store, persistor};