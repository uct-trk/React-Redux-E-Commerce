import { handleAddToCart } from "../../Utils/cartUtils";
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
            default:
                return state;
    }
}

export default cartReducer