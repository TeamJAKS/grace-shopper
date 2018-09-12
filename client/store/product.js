import axios from 'axios';
//if thunks aren't working, then consider install "npm install redux-thunk"

//action types
// const GOT_ALL_PRODUCTS
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT';
// const ADDED_PRODUCT
// const UPDATED_PRODUCT
const GOT_REVIEWS = 'GOT_REVIEWS';


//action creators
const gotSingleProduct = product => ({type: GOT_SINGLE_PRODUCT, product})
const gotReviews = reviews => ({type: GOT_REVIEWS, reviews})

//thunks
export const getSingleProduct = id => {
    return async (dispatch)=> {
        const {data} = await axios.get(`/api/product/${id}`)
        dispatch(gotSingleProduct(data[0]))
    }
}

export const getReviews = productId => {
    return async (dispatch) => {
        const {data} = await axios.get(`/api/product/${productId}/reviews`)
        dispatch(gotReviews(data))
    }
}

const initialState = {
    products: [],
    singleProduct: {},
    reviews: [],
    error: null,
    loading: null
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_SINGLE_PRODUCT:
            return {...state , singleProduct: {...action.product}}
        case GOT_REVIEWS:
            return {...state, reviews: [...action.reviews]}
        default: return state
    }
}

export default productReducer