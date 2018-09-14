import axios from 'axios'
//if thunks aren't working, then consider install "npm install redux-thunk"

//action types
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_PRODUCT_CATEGORY = 'GOT_PRODUCT_CATEGORY'
const ADDED_PRODUCT = 'ADDED_PRODUCT'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'

const GOT_REVIEWS = 'GOT_REVIEWS'

//action creators

const gotSingleProduct = product => ({type: GOT_SINGLE_PRODUCT, product})
const gotReviews = reviews => ({type: GOT_REVIEWS, reviews})

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

const addedProduct = productId => {
  return {
    type: ADDED_PRODUCT,
    productId
  }
}

const updateProduct = productUpdate => {
  return {
    type: UPDATED_PRODUCT,
    productUpdate
  }
}

//thunks
export const getSingleProduct = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/product/${id}`)
    dispatch(gotSingleProduct(data[0]))
  }
}

export const getReviews = productId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/product/${productId}/reviews`)
    dispatch(gotReviews(data))
  }
}

export const fetchProducts = () => {
  return async dispatch => {
    const response = await axios.get('/api/product')
    const products = response.data
    dispatch(gotAllProducts(products))
  }
}

export const fetchByCategory = categoryId => {
  return async dispatch => {
    const response = await axios.get(`/api/product/category/${categoryId}`)
    const products = response.data
    dispatch(gotProductCategory(products))
  }
}

export const addNewProduct = product => {
  return async dispatch => {
    const response = await axios.post('/api/product', product)
    const data = response.data
    dispatch(addedProduct(data))
  }
}

export const updateOldProduct = product => {
  return async dispatch => {
    const {data: productUpdate} = await axios.put(
      `/api/product/${product.id}`,
      product
    )
    dispatch(updateProduct(productUpdate))
  }
}

const initialState = {
  products: [],
  singleProduct: {},
  reviews: [],
  error: null,
  loading: null,
  product: {},
  productUpdate: {}
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
    case GOT_SINGLE_PRODUCT:
      return {...state, singleProduct: {...action.product}}
    case GOT_REVIEWS:
      return {...state, reviews: [...action.reviews]}
    case ADDED_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product]
      }
    case UPDATED_PRODUCT:
      return {
        ...state,
        products: state.product.map(product => {
          if (product.id === action.product.id) return action.productUpdate
          else {
            return product
          }
        })
      }
    default:
      return state
  }
}

export default productReducer
