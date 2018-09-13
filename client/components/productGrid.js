import React from 'react'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import {styles} from './display-many-products'

const ProductGrid = props => {
  const product = props.product
  return (
    <div className={styles.gridList}>
      <GridListTile key={product.title}>
        <img src={`/${product.imgUrl}`} alt={product.title} />
        <GridListTileBar
          title={product.title}
          subtitle={<span>{product.description}</span>}
        />
      </GridListTile>
    </div>
  )
}
export default ProductGrid
