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

//CUT BELOW DUMMY DATA
const fakeCartItem = {
    title: 'Cook a Duck', 
    price: 30.50,
    imageUrl: 'D'
}

const fakeCartItem2 = {
    title: 'Cook a Big Duck', 
    price: 45.50,
    imageUrl: 'D'
}

const fakeCartItem3 = {
    title: 'Cook a Little Duck', 
    price: 50.50,
    imageUrl: 'D'
}

const fakeItems = [fakeCartItem, fakeCartItem2, fakeCartItem3]
const fakeItemsPrices = [fakeCartItem.price, fakeCartItem2.price, fakeCartItem3.price]

///CUT ABOVE DUMMY DATA
const findTotalPrices = (accumulator, currentValue) => accumulator + currentValue;

class Cart extends Component {
    componentDidMount(){
        this.props.getCartOrders(this.props.userId)
    }
    render(){
        console.log('here is the state in the Cart.js Component', this.props)
        const {cartItems} = this.props.cartItems
        return (
            <div>
                <h1>Your Shopping Cart</h1>
                {cartItems ? <List>
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
    console.log('here is the state in the carts map statto props', state)
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
