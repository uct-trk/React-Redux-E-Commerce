import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer/rootReducer'
import logger from 'redux-logger'


export const middlewares = [thunk, logger]

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store;