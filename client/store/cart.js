import axios from 'axios';


const FILLED_CART = 'FILLED_CART'
const REMOVED_FROM_CART = 'REMOVED_FROM_CART'


export function filledCart(cart) {
    return {
        type: FILLED_CART, 
        cart: cart.products, 
        orderId: cart.id
    }   
  }
export function removedFromCart(productId) {
    return {type: REMOVED_FROM_CART, productId}
  }


const initialState = {
    orderId: null,
    cartItems: []
}

//thunks
//may use getSingleProduct thunk or create originial thunks
//create thunk that will add items to an existing cart via order OR update an existing cart
//order.getProducts will exist due to sequelize magical methods with associations and order.addProduct or .setProduct

export function getCartOrders(userId) {
    return async dispatch => {
        const {data} = await axios.post('/api/cart', userId)
        dispatch(filledCart(data))
    }
}

export function addItemToCart(orderId, productId){
    return async dispatch => {
        const {data} = await axios.put('/api/cart', orderId, productId)
        dispatch(filledCart(data))
    }
}


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case FILLED_CART:
            if(action.cart){
                return {...state, orderId: action.orderId, cartItems: [...action.cart]}
            } else {
                return {...state, orderId: action.orderId}
            }
            
      case REMOVED_FROM_CART:
          return {...state, cartItems: state.cartItems.filter(id => id !== action.productId)}
      default:
        return state
    }
  
  }

  export default cartReducer;