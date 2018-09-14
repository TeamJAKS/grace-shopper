import axios from 'axios';
import {getSingleProduct} from './product'

const ADDED_TO_CART = 'ADDED_TO_CART'
const REMOVED_FROM_CART = 'REMOVED_FROM_CART'


export function addedToCart(productId) {
    return {type: ADDED_TO_CART, productId}   
  }
export function removedFromCart(productId) {
    return {type: REMOVED_FROM_CART, productId}
  }


const initialState = {
    cartItems: []
}

//thunks
//may use getSingleProduct thunk or create originial thunks


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADDED_TO_CART:
          return {...state, cartItems: [...state.cartItems, action.productId ]}
      case REMOVED_FROM_CART:
          return {...state, cartItems: state.cartItems.filter(id => id !== action.productId)}
      default:
        return state
    }
  
  }

  export default cartReducer;