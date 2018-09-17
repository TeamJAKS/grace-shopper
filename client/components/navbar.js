import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import {getAllCategories} from '../store/product'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
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
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
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
    const categories = this.props.categories
    return (
      <div>
        <h1>BOILERMAKER</h1>
        <nav>
          {this.props.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={this.props.handleClick}>
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
            <Button variant="outlined" color="primary">
              Products
            </Button>{' '}
          </NavLink>

          <Button
            color="primary"
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            Categories
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {categories.map(category => {
              return (
                <NavLink
                  key={category.id}
                  to={`/product/category/${category.title}`}
                >
                  <MenuItem onClick={this.handleClose}>
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
