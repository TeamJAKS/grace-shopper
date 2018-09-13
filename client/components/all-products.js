import React from 'react'
import {fetchProducts} from '../store/product'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import DisplayManyProducts from './display-many-products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const products = this.props.products
    if (products) {
      return (
        <div>
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
    products: state.product.products
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
