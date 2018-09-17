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
import ErrorNoProduct from './Error_NoProduct'
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

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getSingleProduct(Number(this.props.id))
  }
  render() {
    const {classes} = this.props
    const product = this.props.singleProduct
    console.log('ERROR', this.props.error)
    if (this.props.error) {
      return <ErrorNoProduct />
    } else {
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
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
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
    error: state.product.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SingleProduct)
)
