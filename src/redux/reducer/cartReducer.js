import { handleAddToCart, handleReduceCartItem, handleRemoveCartItem } from "../../Utils/cartUtils";
import cartTypes from "../Cart/cartTypes";


const INITITAL_STATE = {
    cartItems: []
}

const cartReducer = (state=INITITAL_STATE, action) => {
    switch(action.type){
        case cartTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: handleAddToCart({ // sepete ekleme utıls fonksiyonu sayesinde
                    prevCartItems: state.cartItems,
                    nextCartItem: action.payload
                })
            };
            case cartTypes.REDUCE_CART_ITEM:
                return {
                    ...state,
                    cartItems:handleReduceCartItem({
                        prevCartItems: state.cartItems,
                        cartItemToReduce: action.payload
                    })
                }
            case cartTypes.REMOVE_CART_ITEM:
                return{
                    ...state,
                    cartItems: handleRemoveCartItem({ // sepetten silme utıls fonksiyonu
                        prevCartItems: state.cartItems,
                        cartItemToRemove: action.payload
                    })
                }
            default:
                return state;
    }
}

export default cartReducer