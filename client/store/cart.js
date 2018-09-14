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
    cartItems: [],
    orderId: null
}

//thunks
//may use getSingleProduct thunk or create originial thunks
//create thunk that will add items to an existing cart via order OR update an existing cart
//order.getProducts will exist due to sequelize magical methods with associations and order.addProduct or .setProduct

export function getCartOrders(userId) {
    
}

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