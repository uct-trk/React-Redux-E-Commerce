import {combineReducers} from 'redux'
import cartReducer from './cartReducer'
import productsReducer from './productsReducer'
import userReducer from './userReducer'

import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer
})

const configStorage = {
    key: "root",
    storage,
    whiteList: ["cartData"]
}

export default persistReducer(configStorage, rootReducer)