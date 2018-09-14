import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateOldProduct} from '../store/product'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import {InputAdornment} from '@material-ui/core'
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit
  }
})

class UpdateProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      price: 0,
      quantity: 0,
      category: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const {title, price, quantity, category} = this.state
    this.props.update({title, price, quantity, category})
    alert('An updated product was submitted: ')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormControl className="name">
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl className="name">
          <InputLabel htmlFor="title">Price</InputLabel>
          <Input
            id="adornment-amount"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <FormControl className="name">
          <InputLabel htmlFor="title">Quantity</InputLabel>
          <Input
            id="quantity"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl className="name">
          <InputLabel htmlFor="title">Category</InputLabel>
          <Input
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          />
        </FormControl>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: product => dispatch(updateOldProduct({product}))
  }
}

const UpdateComponent = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateProductForm)
)
export default withStyles(styles)(UpdateComponent)
