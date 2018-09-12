import axios from 'axios'

//action types
// const GOT_ALL_PRODUCTS
// const GOT_SINGLE_PRODUCT
// const ADDED_PRODUCT
// const UPDATED_PRODUCT


//action creators

//thunks

const initialState = {
    products: [],
    singleProduct: {},
    error: null,
    loading: null
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        default: return state
    }
}

export default productReducer