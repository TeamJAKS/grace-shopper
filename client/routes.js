import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {fetchProducts, me, getCartOrders} from './store'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  ProductCategory,
  SingleProductFullView,
  AddProductForm,
  UpdateProductForm,
  SearchView,
  AddReviewForm,
  UserProfile,
  EditProfile,
  Cart,
  CheckoutNLI
} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    if (this.props.userId) {
      this.props.getCartOrders(this.props.userId)
    }
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/product" component={AllProducts} />
        <Route
          exact
          path="/product/:productId"
          component={SingleProductFullView}
        />
        <Route
          exact
          path="/product/category/:category"
          component={ProductCategory}
        />
        <Route exact path="/product/add/form" component={AddProductForm} />
        <Route
          exact
          path="/product/:productId/update"
          component={UpdateProductForm}
        />
        <Route
          path="/product/:productId/add/review"
          component={AddReviewForm}
        />
        <Route path="/cart" component={Cart} />
        <Route path="/search" component={SearchView} />
        <Route path="/checkout" component={CheckoutNLI} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route
              exact
              path="/users/profile/:userId"
              component={UserProfile}
            />
            <Route
              exact
              path="/users/profile/:userId/edit"
              component={EditProfile}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    async loadInitialData() {
      await dispatch(me())
      await dispatch(fetchProducts())
      //await dispatch(getCartOrders(userId))
    },
    getCartOrders: userId => dispatch(getCartOrders(userId))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
