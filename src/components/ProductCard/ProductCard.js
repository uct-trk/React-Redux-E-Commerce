import React, { useEffect } from 'react'
import './productCard.scss'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductStart, setProduct } from '../../redux/Products/productsActions'
import Button from '../Forms/Button/Button'
import { addProduct } from '../../redux/Cart/cartActions'


const mapState = state => ({
    product: state.productsData.product
})

const ProductCard = ({}) => {

    const dispatch = useDispatch()
    const history = useHistory()
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

    const handleAddToCart = (product) => {
        if(!product) return
        dispatch(addProduct(product))
        history.push('/cart')
    }

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
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
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
