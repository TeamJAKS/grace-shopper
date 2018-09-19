import axios from 'axios'

const FILLED_CART = 'FILLED_CART'
const REMOVED_FROM_CART = 'REMOVED_FROM_CART'
const ADD_TO_CART_NLI = 'ADD_TO_CART_NLI'
const FILL_CART_NLI = 'FILL_CART_NLI'

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

export function addToCartNLI(product) {
  return {type: ADD_TO_CART_NLI, product}
}

export function fillCartNLI(cart) {
  return {
    type: FILL_CART_NLI,
    cart
  }
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

export function addItemToCart(infoObj) {
  return async dispatch => {
    const {data} = await axios.put('/api/cart', infoObj)
    dispatch(filledCart(data))
  }
}

export function setCartState() {
  const curCart = JSON.parse(window.localStorage.getItem('cart'))
  return dispatch => {
    dispatch(fillCartNLI(curCart))
  }
}

export function checkout(reqObj) {
  return async dispatch => {
    const {data} = await axios.put('/api/cart/checkout', reqObj)
    dispatch(filledCart({products: [], id: data.id}))
  }
}

export function checkoutNLI(reqObj) {
  return async dispatch => {
    const data = await axios.post('/api/cart/checkout', reqObj)
    dispatch(fillCartNLI([]))
  }
}

export function removeItem(infoObj) {
  return async dispatch => {
    const {data} = await axios.put('/api/cart/deleteItem', infoObj)
    dispatch(filledCart(data))
  }
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILLED_CART:
      if (action.cart) {
        return {...state, orderId: action.orderId, cartItems: [...action.cart]}
      } else {
        return {...state, orderId: action.orderId}
      }

    case REMOVED_FROM_CART:
      const newCart = state.cartItems.filter(
        item => item.id !== action.productId
      )
      const newState = {...state, cartItems: newCart}
      console.log('newState', newState)
      return newState

    case ADD_TO_CART_NLI:
      if (state.cartItems && state.cartItems.length) {
        return {...state, cartItems: [...state.cartItems, action.product]}
      } else {
        return {...state, cartItems: [action.product]}
      }

    case FILL_CART_NLI:
      return {...state, cartItems: action.cart}
    default:
      return state
  }
}

export default cartReducer
