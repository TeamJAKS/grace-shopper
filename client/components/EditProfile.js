import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../store/user'
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
    this.state = {
      id: Number(props.user.id),
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const {id, firstName, lastName, email, password} = this.state
    this.props.update({id, firstName, lastName, email, password})
    this.props.history.push(`/users/profile`)
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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: user => dispatch(updateUser(user))
  }
}

const UpdateComponent = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)
)
export default withStyles(styles)(UpdateComponent)
