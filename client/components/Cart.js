/* 
Idea:
Cart should be persistent on main pages users/visitors will browse products (ie. SingleProductFullView
    SingleProduct, AllProducts)
When cart is closed (if not persistent), then we should redirect to the last page viewed by client
*/

import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux'
import {getCartOrders} from '../store'


const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });

//const userId = 1

class Cart extends Component {

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
                {cartItems && cartItems.length ? <List>
                {cartItems.map(product => {
                    return (
                        <ListItem key={product.id}>
                            <Avatar>
                            {product.imageUrl}
                            </Avatar>
                            <ListItemText primary={product.title} secondary={product.price.toFixed(2)} />
                        </ListItem> 
                    )
                })}
                 {/* <h2>Total Price: ${fakeItemsPrices.reduce(findTotalPrices,0).toFixed(2)}</h2> */}
            </List> : <h3>Your Cart Is Empty</h3>}
                
            </div>
            
        )

    }
}

const mapStateToProps = state => {
    console.log(state.user.id)
    return {
      cartItems: state.cart.cartItems,
      userId: state.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getCartOrders: userId => dispatch(getCartOrders(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Cart));
