import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
import {getAllCategories} from '../store/product'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const defaultState = {
  search: '',
  anchorEl: null,
  anchorEl2: null
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleClick = this.handleClick.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleClick(evt) {
    this.setState({anchorEl: evt.currentTarget})
  }

  handleClick2(evt) {
    this.setState({anchorEl2: evt.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  handleClose2 = () => {
    this.setState({anchorEl2: null})
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    console.log('props', this.props)
    const {anchorEl, anchorEl2} = this.state
    const categories = this.props.categories
    const userId = this.props.user.id
    return (
      <div>
        <h1>GRACE SHOPPER</h1>
        <nav>
          {this.props.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Button to="/home" color="secondary">
                <h2>Home</h2>
              </Button>
              <Button onClick={this.props.handleClick} color="secondary">
                <h2>Logout</h2>
              </Button>

              <Button
                props="user"
                color="primary"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <h2>{this.props.user.firstName}</h2>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <NavLink to={`/users/profile/${userId}`}>
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                </NavLink>
                <MenuItem onClick={this.handleClose}>My Orders</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Button to="/login" color="secondary">
                <h2>Login</h2>
              </Button>
              <Button to="/signup" color="secondary">
                <h2>Sign Up</h2>
              </Button>
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
            to={{pathname: '/search', state: {searchTerm: this.state.search}}}
          >
            <button type="submit" onClick={() => this.setState(defaultState)}>
              Submit
            </button>
          </NavLink>
          <NavLink to="/product">
            <Button color="primary">Products</Button>{' '}
          </NavLink>

          <Button
            color="primary"
            aria-owns={anchorEl2 ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick2}
          >
            Categories
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl2}
            open={Boolean(anchorEl2)}
            onClose={this.handleClose2}
          >
            {categories.map(category => {
              return (
                <NavLink
                  key={category.id}
                  to={`/product/category/${category.title}`}
                >
                  <MenuItem onClick={this.handleClose2}>
                    {category.title}
                  </MenuItem>
                </NavLink>
              )
            })}
          </Menu>

          <NavLink to="/cart">
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
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
    categories: state.product.categories,
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCategories: () => dispatch(getAllCategories()),
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
