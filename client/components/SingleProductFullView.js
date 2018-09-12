import React, {Component} from 'react';
import Review from './Review'
import SingleProduct from './SingleProduct'

const SingleProductFullView = () => {
        return (
            <div>
                <SingleProduct/>
                <Review />
            </div>
            
        )

}

export default SingleProductFullView;