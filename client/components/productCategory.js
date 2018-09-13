import React from 'react'
import {fetchByCategory} from '../store/product'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import ProductGrid from './productGrid'

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
      const {classes} = this.props
      return (
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
              <ListSubheader component="div">
                {this.state.category}
              </ListSubheader>
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
    fetchAllProducts: category => dispatch(fetchByCategory(category))
  }
}

const ProductsComponent = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductCategory)
)

ProductCategory.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductsComponent)
