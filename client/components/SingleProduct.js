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
import {addItemToCart, addToCartNLI, setCartState} from '../store'
import ErrorNoProduct from './Error_NoProduct';
//potential material ui component - card, complex
//suggestion to look at gist for themes

const styles = {
  card: {
    maxWidth: 400
  },
  media: {
    height: 300,
    objectFit: 'cover'
  }
}

//ISSUE - state not staying stable. don't have access to orderId here for some reason

class SingleProduct extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getSingleProduct(Number(this.props.id))
  }

  async handleClick () {
    const reqBodyObj = {orderId: this.props.orderId, productId: Number(this.props.singleProduct.id)}
    if(this.props.orderId) {
    return this.props.addItemToCart(reqBodyObj)
    } else {
      await this.props.setCartState();
      await this.props.addToCartNLI(this.props.singleProduct)
      window.localStorage.setItem("cart", JSON.stringify(this.props.cartItems))
    }
    //use an action creator to add the item to the cartItems array
    //window.localStorage.setItem("cart", this.props.cart.cartItems)
    //to ultimately access this to display a customer's cart, i'm looping over localStorage.getItem("cart")
  }
  render() {
    const {classes} = this.props
    const product = this.props.singleProduct
    console.log('ERROR', this.props.error)

    let adminStatus = this.props.user.adminStatus
    let link
    if (adminStatus) {
      link = <Link to={`${product.id}/update`}>Update Product</Link>
    }

    if (this.props.error) {
      return <ErrorNoProduct />
    } else {
      return (
        <Card className={classes.card}>
          <div>{link}</div>
          <CardActionArea>
            <CardMedia
              component="img"
              className={classes.media}
              image={`/${product.imgUrl}`}
              title={`/${product.titlel}`}
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
            <Button size="small" color="primary" onClick={this.handleClick}>
              Add to Cart
            </Button>
            <Button size="small" color="primary">
              <Link to={`${product.id}/add/review`}>Write a Review</Link>
            </Button>
          </CardActions>
        </Card>
      )
    }
  }
}

SingleProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    singleProduct: state.product.singleProduct,
    orderId: state.cart.orderId,
    error: state.product.error,
    user: state.user,
    cartItems: state.cart.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id)),
    addItemToCart: (orderid, productId) => dispatch(addItemToCart(orderid, productId)),
    addToCartNLI: (product) => dispatch(addToCartNLI(product)),
    setCartState: () => dispatch (setCartState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SingleProduct)
)
