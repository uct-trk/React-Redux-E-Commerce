import React, { useEffect } from 'react'
import './productCard.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductStart, setProduct } from '../../redux/Products/productsActions'
import Button from '../Forms/Button/Button'


const mapState = state => ({
    product: state.productsData.product
})

const ProductCard = ({}) => {

    const dispatch = useDispatch()
    const { productID } = useParams()
    const { product } = useSelector(mapState)

    const {
        productThumbnail,
        productName,
        productPrice,
        productDesc,
    } = product;

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )

        return () => {
            dispatch(
                setProduct({})
            )
        }
    }, [])

    const configAddToCartBtn = {
        type: "button"
    }

    return (
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail}/>
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                            {productPrice}₺
                        </span>
                    </li>
                    <li>   {/* CKEeditor yuzunden boyle yazdık */}
                        <span dangerouslySetInnerHTML={{ __html: productDesc}}>
                            
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button>
                                Add To Cart
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductCard