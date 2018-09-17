import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Route, Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import UserProfile from './UserProfile'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const defaultState = {
  search: '',
  anchorEl: null
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClick(evt) {
    this.setState({anchorEl: evt.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const {anchorEl} = this.state
    return (
      <div>
        <h1>GRACE SHOPPER</h1>
        <nav>
          {this.props.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={this.props.handleClick}>
                Logout
              </a>

              <Button
                color="primary"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                {this.props.user.firstName}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem
                  onClick={() => {
                    this.handleClose()
                    //history.push is not working
                    this.props.history.push(
                      `/users/profile/${this.props.user.id}`
                    )
                  }}
                  type="Profile"
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={this.handleClose}>My Orders</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}

          <label htmlFor="searchProds">Search Our Products</label>
          <input
            name="search"
            type="text"
            onChange={this.handleChange}
            value={this.state.search}
          />
          <NavLink
            to={{pathname: '*search', state: {searchTerm: this.state.search}}}
          >
            <button type="submit" onClick={() => this.setState(defaultState)}>
              Submit
            </button>
          </NavLink>
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

export default connect(mapState, mapDispatch)(Navbar)
