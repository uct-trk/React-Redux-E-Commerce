import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducer/rootReducer'

import logger from 'redux-logger'
import thunk from 'redux-thunk'

import createSagaMiddle from 'redux-saga'
import rootSaga from './saga/rootSaga'



const sagaMiddleware = createSagaMiddle()
export const middlewares = [thunk, sagaMiddleware,logger]

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
sagaMiddleware.run(rootSaga)
export default store;