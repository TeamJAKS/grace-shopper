import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const ErrorNoProduct = (props) => {
    return (
        <div>
            <h1>Sorry, product not found</h1>
            <NavLink to='/product'>
            Return to all Products
            </NavLink>
        </div>
    )
}

export default ErrorNoProduct