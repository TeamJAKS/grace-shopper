import React from 'react'
import {fetchProducts} from '../store/product'
import {withRouter, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import ProductGrid from './productGrid'

class AllProducts extends React.Component {
  componentDidMount() {
    console.log(this.props)
    this.props.fetchAllProducts()
  }

  render() {
    const products = this.props.products
    if (products) {
      const {classes} = this.props
      return (
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
              <ListSubheader component="div">All Products</ListSubheader>
            </GridListTile>
            {products.map(product => (
              <ProductGrid product={product} key={product.id} />
            ))}
          </GridList>
        </div>
      )
    } else {
      return null
    }
  }
}
export const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 'auto',
    height: 450
  }
})

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

const ProductsComponent = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)

AllProducts.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductsComponent)
