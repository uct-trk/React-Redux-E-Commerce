import { takeLatest, put, all, call } from 'redux-saga/effects'
import { auth } from '../../firebase/utils';
import { handleAddProduct, handleDeleteProduct, handleFetchProducts } from '../helpers/productsHelpers'
import { setProducts, fetchProductsStart } from '../Products/productsActions';
import productsTypes from './../Products/productsTypes'


export function* addProduct({ payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice
} }){
    try {
        const timestamp = new Date();
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productAdminUserUID: auth.currentUser.uid,
            createDate: timestamp
        });
        yield put(
            fetchProductsStart()
        );

    } catch (error) {
        console.log(error)
    }
}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts(){
    try{
        const products = yield handleFetchProducts()
        yield put(
            setProducts(products)
        )
    } catch(err){
        console.log(err)
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({payload}){
    try {
        yield handleDeleteProduct(payload);
        yield put(
            fetchProductsStart()
        );

    } catch (error) {
        console.log(error)
    }
}

export function* onDeleteProductStart(){
    yield takeLatest(productsTypes.DELETE_PRODUCT_START,deleteProduct)
}

export default function* productsSagas(){
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart)
    ])
}