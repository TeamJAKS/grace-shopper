console.log('TEST')
import React from 'react'
import ReactDOM from 'react-dom'
//import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
//import IconButton from '@material-ui/core/IconButton';
//import InfoIcon from '@material-ui/icons/Info';
//import tileData from './tileData';

const fakeProduct = {
  title: 'talent',
  imgUrl: 'marcy.jpg',
  price: 2.45,
  description: 'about product',
  quantity: 4,
  category: 'Cooking'
}

class AllProducts extends React.Component {
  render() {
    return (
      <div>
        <GridList cellHeight={180} className={fakeProduct.title}>
          <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
            <ListSubheader component="div">All Products</ListSubheader>
          </GridListTile>
          <GridListTile key={fakeProduct.imgUrl}>
            <img src={fakeProduct.imgUrl} alt={fakeProduct.title} />
            <GridListTileBar
              title={fakeProduct.title}
              subtitle={<span>fakeProduct.description</span>}
            />
          </GridListTile>
        </GridList>
      </div>
    )
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

export default withStyles(styles)(AllProducts)
