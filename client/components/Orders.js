import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import {gotProducts, gotOrders} from '../store/orders'

class Orders extends React.Component {
  componentDidMount() {
    this.props.userOrders()
  }

  render() {
    let cartItems = this.props.cart.cartItems
    return (
      <div>
        <h4>Previous Orders</h4>
        {cartItems.map(product => {
          return (
            <ListItem key={product.id}>
              <Avatar>{product.imageUrl}</Avatar>
              <ListItemText
                primary={product.title}
                secondary={product.price.toFixed(2)}
              />
            </ListItem>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userOrders: id => dispatch(gotOrders(id))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders))
