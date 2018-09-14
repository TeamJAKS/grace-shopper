import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import ProductGrid from './productGrid'

const DisplayManyProducts = props => {
  const {classes, products, title} = props
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
          <ListSubheader component="div">{title}</ListSubheader>
        </GridListTile>
        {products.map(product => (
          <ProductGrid product={product} key={product.id} />
        ))}
      </GridList>
    </div>
  )
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

DisplayManyProducts.propTypes = {
  classes: PropTypes.object.isRequired
}

const DisplayManyProductsWithAccessToStyle = withStyles(styles)(
  DisplayManyProducts
)
const DispWithRouter = withRouter(DisplayManyProductsWithAccessToStyle)

export default DispWithRouter
