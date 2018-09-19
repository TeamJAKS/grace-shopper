import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import {gotProducts, gotOrders} from '../store/orders'

class Orders extends React.Component {
  componentDidMount() {
    this.props.userOrders(this.props.match.params.userId)
  }

  render() {
    console.log('orders', this.props.orders.orders)
    let orders = this.props.orders.orders
    return (
      <div>
        <h4>Previous Orders</h4>
        {orders.map(order => {
          return (
            <ListItem key={order.id}>
              <ListItemText primary={order.id} secondary={order.order_status} />
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
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userOrders: ord => dispatch(gotOrders(ord))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders))
