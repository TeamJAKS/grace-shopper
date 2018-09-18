import React, {Component} from 'react';
import Review from './Review'
import SingleProduct from './SingleProduct'

const SingleProductFullView = (props) => {
        const id = props.match.params.productId
        return (
            <div>
                <SingleProduct id={id}/>
                <Review id={id}/>
            </div>
            
        )

}

export default SingleProductFullView;