import React from 'react'
import {fetchProducts} from '../store/product'
import {addItemToCart, addToCartNLI, setCartState} from '../store'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import DisplayManyProducts from './display-many-products'


class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const products = this.props.products
    let adminStatus = this.props.user.adminStatus
    let link
    if (adminStatus) {
      link = <Link to="product/add/form">Add Product</Link>
    }
    if (products) {
      return (
        <div>
          <h2>{link}</h2>
          <DisplayManyProducts products={products} title="All Products" orderId= {this.props.orderId} cartItems = {this.props.cartItems}
          addItemToCart = {this.props.addItemToCart} addToCartNLI = {this.props.addToCartNLI} setCartState = {this.props.setCartState}/>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    user: state.user,
    orderId: state.cart.orderId,
    cartItems: state.cart.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => dispatch(fetchProducts()),
    addItemToCart: (reqBodObj) => dispatch(addItemToCart(reqBodObj)),
    addToCartNLI: product => dispatch(addToCartNLI(product)),
    setCartState: () => dispatch(setCartState())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
