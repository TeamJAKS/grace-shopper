import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setCartState, checkoutNLI} from '../store'
//import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit
  }
})   

const defaultState =   
{
    firstName: '',
    lastName: '' ,
    email: '' ,
    password: '',
    street: '' ,
    city: '' ,
    state: '' ,
    zipcode: ''
}


class CheckoutNLI extends Component {
    constructor() {
        super()
        this.state = defaultState
          this.handleChange = this.handleChange.bind(this)
          this.onSubmit = this.onSubmit.bind(this)
        }

    
   
    componentDidMount() {
        this.props.setCartState()
    }
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(evt) {
        evt.preventDefault()
        const cartItemsArr = []
        this.props.cartItems.forEach(item => cartItemsArr.push(item.id))
        const reqBody = {formInput: this.state, cartItemsArr: cartItemsArr}
        this.props.checkoutNLI(reqBody)
    }
    
    render() {
    return (
        <div>
            <h1>Please Create an Account to Checkout</h1>
                <form onSubmit={this.handleSubmit}>
                    <FormControl className="name">
                    <InputLabel htmlFor="title">First Name</InputLabel>
                    <Input
                        id="title"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                    />
                    </FormControl>
                    <FormControl className="name">
                    <InputLabel htmlFor="title">Last Name</InputLabel>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                    />
                    </FormControl>
                    <FormControl className="name">
                    <InputLabel htmlFor="title">Street</InputLabel>
                    <Input
                        id="street"
                        name="street"
                        value={this.state.street}
                        onChange={this.handleChange}
                    />
                    </FormControl>
                    <FormControl className="name">
                    <InputLabel htmlFor="title">City</InputLabel>
                    <Input
                        id="city"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                    />
                    </FormControl>
                    <FormControl className="name">
                    <InputLabel htmlFor="title">State</InputLabel>
                    <Input
                        id="state"
                        name="state"
                        value={this.state.state}
                        onChange={this.handleChange}
                    />
                    </FormControl>
                    <FormControl className="name">
                    <InputLabel htmlFor="title">Zip</InputLabel>
                    <Input
                        id="zipcode"
                        name="zipcode"
                        value={this.state.zipcode}
                        onChange={this.handleChange}
                    />
                    </FormControl>
                    <FormControl className="name">
                    <InputLabel htmlFor="title">Email</InputLabel>
                    <Input
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    </FormControl>
                    <FormControl className="name">
                    <InputLabel htmlFor="title">Password</InputLabel>
                    <Input
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    </FormControl>
                    <button type="submit" onClick = {(evt) => this.onSubmit(evt)}>Submit</button>
                </form>
        </div>
    )}
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cartItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCartState: () => dispatch(setCartState()),
        checkoutNLI: (reqObj) => dispatch(checkoutNLI(reqObj))  
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(CheckoutNLI)
  )