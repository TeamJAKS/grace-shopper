import React from 'react'
import {styles} from './display-many-products'
import {Link} from 'react-router-dom'

import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
//import {addItemToCart, addToCartNLI, setCartState} from '../store'

const handleClick = async (product, orderId, cart, addItemToCart) => {
  console.log('hello?')
  const reqBodyObj = {
    orderId: orderId,
    productId: Number(product.id)
  }
  console.log('reqBodyObj', reqBodyObj)
  if (orderId) {
    console.log('orderId', orderId)
    return addItemToCart(reqBodyObj)
  } else {
    await setCartState()
    await addToCartNLI(product)
    window.localStorage.setItem('cart', JSON.stringify(cart))
}
}

const ProductGrid = props => {
  const product = props.product
  return (
    <div className={styles.gridList}>
      <GridListTile key={product.title}>
        <img src={`/${product.imgUrl}`} alt={product.title} style={{height: '200px', width: '200px'}}/>
        <GridListTileBar
          title={<Link to={`/product/${product.id}`}>{product.title}</Link>}
          subtitle={<span>{product.description}</span>}
          actionIcon={
            <IconButton className={styles.icon}>
              <ShoppingCartIcon onClick ={() => handleClick(product, props.orderId, props.cart, props.addItemToCart)}/>
            </IconButton>
          }
        />
      </GridListTile>
    </div>
  )
}
export default ProductGrid
