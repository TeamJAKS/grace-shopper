/*
Idea:
Cart should be persistent on main pages users/visitors will browse products (ie. SingleProductFullView
    SingleProduct, AllProducts)
When cart is closed (if not persistent), then we should redirect to the last page viewed by client
*/

import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import {connect} from 'react-redux'
import {getCartOrders, removeItem, setCartState, removedFromCart, checkout} from '../store'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

//const userId = 1

class Cart extends Component {
    constructor () {
        super()
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

  handleClick(productId) {
    const reqBodyObj = {orderId: this.props.orderId, productId: productId}
    if (this.props.orderId) {
      return this.props.removeItem(reqBodyObj)
    } else {
      this.props.setCartState()
      console.log('PRODUCT ID', productId)
      this.props.removedFromCart(productId)
      window.localStorage.setItem('cart', JSON.stringify(this.props.cartItems))
    }

    handleSubmit () {
        if (this.props.userId) {
            const reqObj = {id: this.props.orderId, userId: this.props.userId}
            alert('Your Order Has Been Placed')
            this.props.checkout(reqObj)
            this.props.history.push('/product')
        }else {
            this.props.history.push('/checkout')
        }

    }
    render(){
        let cartItems
        if(this.props.userId) {
        cartItems = this.props.cartItems
        }
        else {
        cartItems = JSON.parse(localStorage.getItem("cart"))
        }
        return (
            <div>
                <h1>Your Shopping Cart</h1>
                {cartItems && cartItems.length ? <div><List>
                {cartItems.map(product => {
                    console.log('Product', product)
                    return (
                        <ListItem key={product.id}>
                            <Avatar>
                            {product.imgUrl}
                            </Avatar>
                            <ListItemText primary={product.title} secondary={product.price.toFixed(2)} />
                            <Button onClick = {() => this.handleClick(product.id)}>
                                Remove from Cart
                            </Button>
                        </ListItem>
                    )
                })}
                 {/* <h2>Total Price: ${fakeItemsPrices.reduce(findTotalPrices,0).toFixed(2)}</h2> */}
            </List>
            <Button onClick = {() => this.handleSubmit()}>Checkout </Button>
            </div>
            : <h3>Your Cart Is Empty</h3>}

            </div>

        )

    }
    return (
      <div>
        <h1>Your Shopping Cart</h1>
        {cartItems && cartItems.length ? (
          <div>
            <List>
              {cartItems.map(product => {
                console.log('Product', product)
                return (
                  <ListItem key={product.id}>
                    <Avatar>{product.imgUrl}</Avatar>
                    <ListItemText
                      primary={product.title}
                      secondary={product.price.toFixed(2)}
                    />
                    <Button
                      onClick={async () => await this.handleClick(product.id)}
                    >
                      Remove from Cart
                    </Button>
                  </ListItem>
                )
              })}
              {/* <h2>Total Price: ${fakeItemsPrices.reduce(findTotalPrices,0).toFixed(2)}</h2> */}
            </List>
            <Button>Checkout </Button>
          </div>
        ) : (
          <h3>Your Cart Is Empty</h3>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems,
    userId: state.user.id,
    orderId: state.cart.orderId
  }
}

const mapDispatchToProps = dispatch => {
    return{
        getCartOrders: userId => dispatch(getCartOrders(userId)),
        removeItem: (infoObj) => dispatch(removeItem(infoObj)),
        setCartState: () => dispatch(setCartState()),
        removedFromCart: (productId) => dispatch(removedFromCart(productId)),
        checkout: (obj) => dispatch(checkout(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Cart)
)
