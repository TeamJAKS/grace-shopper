import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'


const defaultState = {
  search: ''
}

class Navbar extends React.Component {
    constructor () {
      super()
      this.state = defaultState
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange (evt) {
      this.setState({
          [evt.target.name]: evt.target.value
      })
    }


  render() {
  return (
      <div>
        <h1>BOILERMAKER</h1>
        <nav>
          {this.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={this.handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
          
            <label htmlFor = 'searchProds'>
            Search Our Products
            </label>
            <input name = 'search' type = 'text' onChange = {this.handleChange} value = {this.state.search} />
            <NavLink to ={{pathname: '*search', state: {searchTerm: this.state.search}}}>
            <button type = 'submit' onClick = {() => this.setState(defaultState)}>Submit</button>
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
