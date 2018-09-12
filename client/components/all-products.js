import React from 'react'
import {fetchProducts} from '../store/product'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
//import IconButton from '@material-ui/core/IconButton';
//import InfoIcon from '@material-ui/icons/Info';
//import tileData from './tileData';

// const fakeProduct = {
//   title: 'talent',
//   imgUrl: 'marcy.jpg',
//   price: 2.45,
//   description: 'about product',
//   quantity: 4,
//   category: 'Cooking'
// }

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const products = this.props.products
    console.log('PROPS ', this.props)
    if (products) {
      const {classes} = this.props
      return (
        <div>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
              <ListSubheader component="div">All Products</ListSubheader>
            </GridListTile>
            {products.map(product => (
              <GridListTile key={product.title}>
                <img src={product.imgUrl} alt={product.title} />
                <GridListTileBar
                  title={product.title}
                  subtitle={<span>{product.description}</span>}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      )
    } else {
      return null
    }
  }
}
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
})

const mapStateToProps = state => {
  console.log('STATE', state)
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
