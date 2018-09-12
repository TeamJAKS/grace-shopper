import axios from 'axios'

//action types
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
// const GOT_SINGLE_PRODUCT
// const ADDED_PRODUCT
// const UPDATED_PRODUCT

//action creators
const gotAllProducts = products => {
  return {
    type: GOT_ALL_PRODUCTS,
    products
  }
}

//thunks

export const fetchProducts = () => {
  return async dispatch => {
    const response = await axios.get('/api/product')
    const products = response.data
    dispatch(gotAllProducts(products))
  }
}

const initialState = {
  products: [],
  singleProduct: {},
  error: null,
  loading: null
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {
        ...state,
        products: action.products,
        loading: true
      }
    default:
      return state
  }
}

export default productReducer
