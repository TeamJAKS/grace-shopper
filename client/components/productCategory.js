import React from 'react'
import {fetchByCategory} from '../store/product'
import {addItemToCart, addToCartNLI, setCartState} from '../store'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import DisplayManyProducts from './display-many-products'

class ProductCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {category: props.match.params.category}
  }

  componentDidMount() {
    this.props.fetchAllProducts(this.state.category)
  }

  render() {
    console.log('CAT PROPS', this.props)
    const products = this.props.products
    if (products) {
      return (
        <div>
          <DisplayManyProducts
            products={products}
            title={this.state.category}
            orderId= {this.props.orderId} cartItems = {this.props.cartItems}
          addItemToCart = {this.props.addItemToCart} addToCartNLI = {this.props.addToCartNLI} setCartState = {this.props.setCartState}
          />
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
    fetchAllProducts: category => dispatch(fetchByCategory(category)),
    addItemToCart: (reqBodObj) => dispatch(addItemToCart(reqBodObj)),
    addToCartNLI: product => dispatch(addToCartNLI(product)),
    setCartState: () => dispatch(setCartState())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductCategory)
)
