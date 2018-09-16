import React, {Component} from 'react'
import {withRouter, NavLink, Link} from 'react-router-dom'
import {getSingleProduct} from '../store/product'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {addItemToCart} from '../store'
//potential material ui component - card, complex
//suggestion to look at gist for themes

const styles = {
  card: {
    maxWidth: 400
  },
  media: {
    height: 300
  }
}

//ISSUE - state not staying stable. don't have access to orderId here for some reason

const orderId = 1

class SingleProduct extends Component {
  constructor () {
    super() 
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getSingleProduct(Number(this.props.id))
  }

  handleClick () {
    const reqBodyObj = {orderId: orderId, productId: Number(this.props.singleProduct.id)}
    return this.props.addItemToCart(reqBodyObj)
  }
  render() {
    const {classes} = this.props
    const product = this.props.singleProduct
    if (!product) {
      return <h1>Hello World</h1>
    }
    return (
      <Card className={classes.card}>
        <div>
          <Link to={`${product.id}/update`}>Update Product</Link>
        </div>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.imageUrl}
            title={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {product.title}
            </Typography>
            <Typography component="p">{product.description}</Typography>
            <Typography component="p">{product.price}</Typography>
            <Typography component="p">{product.quantity}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick = {this.handleClick} >
            Add to Cart
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    )
  }
}

SingleProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  console.log('state.cart', state.cart)
  return {
    singleProduct: state.product.singleProduct,
    orderId: state.cart.orderId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id)),
    addItemToCart: (orderid, productId) => dispatch(addItemToCart(orderid, productId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SingleProduct)
)
