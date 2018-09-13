import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import {InputAdornment} from '@material-ui/core'

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

    alert('An updated product was submitted: ' + this.state.value)
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

export default withRouter(connect(null, null)(UpdateProductForm))
