import React from 'react'
import {fetchProducts} from '../store/product'
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
          <DisplayManyProducts products={products} title="All Products" />
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
    user: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => dispatch(fetchProducts())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
