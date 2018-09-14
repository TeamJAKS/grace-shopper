import React from 'react'
import DisplayManyProducts from './display-many-products'
import {connect} from 'react-redux'

const SearchView = props => {
  const searchTerm = props.location.state.searchTerm
  const filteredProducts = props.products.filter(product => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase())
  })
  return (
    <div>
      <DisplayManyProducts
        products={filteredProducts}
        title="Products that Match Your Search Term"
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.product.products
  }
}

const ConnectedSearchView = connect(mapStateToProps)(SearchView)

export default ConnectedSearchView
