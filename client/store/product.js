import axios from 'axios'
//if thunks aren't working, then consider install "npm install redux-thunk"

//action types

const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_PRODUCT_CATEGORY = 'GOT_PRODUCT_CATEGORY'
const ADDED_PRODUCT = 'ADDED_PRODUCT'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'
const GOT_REVIEWS = 'GOT_REVIEWS'
const ERROR_RETURNED = 'ERROR_RETURNED'
const ADDED_REVIEW ='ADDED_REVIEW'
const GOT_ALL_CATEGORIES = 'GOT_ALL_CATEGORIES'

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

const errorOccured = () => {
  return {
    type: ERROR_RETURNED,
    error: true
  }
}

const addedReview = productReview =>{
  return {
    type: ADDED_REVIEW,
    productReview
  }
}
const gotAllCategories = categories => {
  return {
    type: GOT_ALL_CATEGORIES,
    categories
  }
}

//thunks
export const getSingleProduct = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/product/${id}`)
    if (data.length) {
      dispatch(gotSingleProduct(data[0]))
    } else {
      dispatch(errorOccured())
    }
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

export const fetchByCategory = category => {
  return async dispatch => {
    const response = await axios.get(`/api/product/category/${category}`)
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
      `/api/product/${product.product.id}`,
      product.product
    )
    dispatch(updateProduct(productUpdate))
  }
}

export const addNewReview = (product, productReview) => {
  return async dispatch => {
    const response = await axios.post(`/api/product/${product.id}}`, productReview)
    const data = response.data
    dispatch(addedReview(data))
  }
}

export const getAllCategories = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/product/category')
    dispatch(gotAllCategories(data))
  }
}

const initialState = {
  products: [],
  singleProduct: {},
  reviews: [],
  productReview: {},
  product: {},
  productUpdate: {},
  error: null,
  loading: null,
  categories: []
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
        error: null,
        products: action.products
      }
    case GOT_SINGLE_PRODUCT:
      return {...state, error: null, singleProduct: {...action.product}}
    case GOT_REVIEWS:
      return {...state, reviews: [...action.reviews]}
    case ADDED_PRODUCT:
      return {
        ...state,
        error: null,
        loading: true,
        products: [...state.products, action.product]
      }
    case ADDED_REVIEW:
      return {
        ...state,
        error: null,
        reviews: [...state.reviews, action.productReview]
      }
      case UPDATED_PRODUCT:
      return {
        ...state,
        singleProduct: action.productUpdate,
        products: state.products.map(product => {
          if (product.id === action.productUpdate.id)
            return action.productUpdate
          else return product
        }),
        error: null,
        loading: true
      }
    case ERROR_RETURNED:
      return {
        ...state,
        error: action.error
      }
    case GOT_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state
  }
}

export default productReducer
