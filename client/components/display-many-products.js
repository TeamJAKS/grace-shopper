import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import ProductGrid from './productGrid'

export const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 'auto',
    height: 'auto',//keyairra made a change. this was originally --> height: 450
  },
})

const DisplayManyProducts = props => {
  const {classes, products, title} = props
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
          <ListSubheader component="div">{title}</ListSubheader>
        </GridListTile>
        {products.map(product => (
          <ProductGrid product={product} key={product.id} orderId = {props.orderId} cart = {props.cartItems}
          addItemToCart = {props.addItemToCart} addToCartNLI = {props.addToCartNLI} setCartState = {props.setCartState}/>
        ))}
      </GridList>
    </div>
  )
}

DisplayManyProducts.propTypes = {
  classes: PropTypes.object.isRequired
}

const DisplayManyProductsWithAccessToStyle = withStyles(styles)(
  DisplayManyProducts
)
const DispWithRouter = withRouter(DisplayManyProductsWithAccessToStyle)

export default DispWithRouter
