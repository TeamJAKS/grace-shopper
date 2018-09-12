import axios from 'axios'

//action types

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