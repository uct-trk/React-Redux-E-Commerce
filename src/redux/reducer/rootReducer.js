import {combineReducers} from 'redux'
import cartReducer from './cartReducer'
import productsReducer from './productsReducer'
import userReducer from './userReducer'


export default combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer
})