import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsStart } from '../../redux/Products/productsActions'
import Product from './Product/Product'
import './products.scss'

const mapState = ({productsData}) => ({
    products: productsData.products
})

const ProductResult = ({}) => {

    const {products} = useSelector(mapState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProductsStart())
    },[])

    // array değilse boş döndür
    if(!Array.isArray(products)) return null
    if(products.length < 1){
        return(
            <div className="products">
                <p>
                    No search
                </p>
            </div>
        )
    }

    return (
        <div className="products">
            <h1 className="head">Browse Products</h1>
           <div className="productResults">
           {products.map((product, pos)=> {
                const {productThumbnail, productName, productPrice} = product;
                if(!productThumbnail || !productName || typeof productPrice === 'undefined') return null                

                const configProduct = {
                    productThumbnail,
                    productName, 
                    productPrice
                }

                return(
                    <Product {...configProduct}/>
                )
            })}
           </div>
        </div>
    )
}

export default ProductResult
