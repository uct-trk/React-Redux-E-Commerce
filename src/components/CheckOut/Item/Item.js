import React from 'react'
import {useDispatch} from 'react-redux'
import { removeCartItem, addProduct, reduceCartItem } from '../../../redux/Cart/cartActions';


const Item = (product) => {

    const dispatch = useDispatch();

    const {
        productName,
        productThumbnail,
        productPrice,
        quantity,
        documentID
    } = product;

    const handleRemoveCartItem = (documentID) => {
        dispatch(
            removeCartItem({
                documentID
            })
        )
    }

    // ürün sayısını artırmak için
    const handleAddProduct = (product) => {
        dispatch(
            addProduct(product)
        )
    }

    // ürün sayısını azaltmak için
    const handleReduceItem = (product) => {
        dispatch(
            reduceCartItem(product)
        )
    }

    return (
        <table className="cartItem" border="0" cellPadding="10" cellSpacing="10">
            <tbody>
                <tr>
                    <td>
                        <img src={productThumbnail}/>
                    </td>
                    <td>
                        {productName}
                    </td>
                    <td>
                        <span className="cartBtn" onClick={() => handleReduceItem(product)}>
                            {`< `}
                        </span>
                        <span>
                            {quantity}
                        </span>
                        <span className="cartBtn" onClick={() => handleAddProduct(product)}>
                            {` >`}
                        </span>
                    </td>
                    <td>
                        {productPrice}₺
                    </td>
                    <td align="center">
                        <span className="cartBtn" onClick={() => handleRemoveCartItem(documentID)}>
                            X
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Item
