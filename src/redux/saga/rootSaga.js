import {all, call} from 'redux-saga/effects'
import userSagas from './userSagas'
import productsSagas from './productsSaga'

export default function* rootSaga(){
    yield all([
        call(userSagas),
        call(productsSagas)])
}