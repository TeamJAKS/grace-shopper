import React from 'react'
import {fetchByCategory} from '../store/product'
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
    const products = this.props.products
    if (products) {
      return (
        <div>
          <DisplayManyProducts
            products={products}
            title={this.state.category}
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
    products: state.product.filteredProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: category => dispatch(fetchByCategory(category))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductCategory)
)
