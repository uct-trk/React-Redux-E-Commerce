import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchProductsStart } from '../../redux/Products/productsActions'
import FormSelect from '../Forms/FormSelect./FormSelect'
import LoadMore from '../LoadMore/LoadMore'
import Product from './Product/Product'
import './products.scss'


const mapState = ({productsData}) => ({
    products: productsData.products
})

const ProductResult = ({ }) => {

    const {products} = useSelector(mapState)
    const {data, queryDoc, isLastPage } = products

    const dispatch = useDispatch()
    
    const {filterType } = useParams()
    const history = useHistory()
    

    useEffect(() => {
        dispatch(
            fetchProductsStart({filterType }))
    },[filterType])

    const handleFilter = (e) => {
        const nextFilter = e.target.value
        history.push(`/search/${nextFilter}`)
    }

    // array değilse boş döndür
    if(!Array.isArray(data)) return null
    if(data.length < 1){
        return(
            <div className="products">
                <p>
                    No search
                </p>
            </div>
        )
    }

    const configFilters = {

        defaultValue: filterType ,
        options: [{
            name: "Show all",
            value: ""
        }, {
            name:"Mens",
            value:"mens"
        }, {
            name:"Womens",
            value:"womens"
        }],
        handleChange: handleFilter
    };

    const handleLoadMore = () => {
         dispatch(
             fetchProductsStart({
                filterType, 
                startAfterDoc: queryDoc,
                persistProducts: data})
         )
    }

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
    }

    return (
        <div className="products">
            <h1 className="head">Browse Products</h1>

            <FormSelect {...configFilters}/>

           <div className="productResults">
           {data.map((product, pos)=> {
                const {productThumbnail, productName, productPrice} = product;
                if(!productThumbnail || !productName || typeof productPrice === 'undefined') return null                

                const configProduct = {
                    ...product
                }

                return(
                    <Product {...configProduct}/>
                )
            })}
           </div>
           {!isLastPage && (
            <LoadMore {...configLoadMore}/>
           )}
           
        </div>
    )
}

export default ProductResult
