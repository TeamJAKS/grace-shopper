import axios from 'axios'

//action types
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_PRODUCT_CATEGORY = 'GOT_PRODUCT_CATEGORY'
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

const gotProductCategory = products => {
  return {
    type: GOT_PRODUCT_CATEGORY,
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

export const fetchByCategory = category => {
  return async dispatch => {
    const response = await axios.get(`/api/product/category/${category}`)
    const products = response.data
    dispatch(gotProductCategory(products))
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
        products: action.products
      }
    case GOT_PRODUCT_CATEGORY:
      return {
        ...state,
        products: action.products
      }
    default:
      return state
  }
}

export default productReducer
