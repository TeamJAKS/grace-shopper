import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateUser, updateAddress, getUserAddress} from '../store/user'
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

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props)
    console.log('PROPS', props.address[0].zipCode)
    this.state = {
      id: Number(props.user.id),
      firstName: '' || props.user.firstName,
      lastName: '' || props.user.lastName,
      email: '' || props.user.email,
      password: '' || props.user.password,
      street: '' || props.address[0].street,
      city: '' || props.address[0].city,
      state: '' || props.address[0].state,
      zipCode: '' || Number(props.address[0].zipCode)
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getAddress(this.props.user.id)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const {
      id,
      firstName,
      lastName,
      email,
      password,
      street,
      city,
      state,
      zipCode
    } = this.state
    this.props.updateUser({id, firstName, lastName, email, password})
    this.props.updateAddress({street, city, state, zipCode}, id)
    this.props.history.push(`/users/profile/${id}`)
  }

  render() {
    return (
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
            id="zip"
            name="zip"
            value={this.state.zip}
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
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    address: state.user.address
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAddress: id => dispatch(getUserAddress(id)),
    updateUser: user => dispatch(updateUser(user)),
    updateAddress: (address, id) => dispatch(updateAddress(address, id))
  }
}

const UpdateComponent = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)
)
export default withStyles(styles)(UpdateComponent)
