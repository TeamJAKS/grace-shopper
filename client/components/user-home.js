import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const firstName = props.user.firstName
  if (firstName) {
    return (
      <div>
        <h3>Welcome, {firstName}</h3>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Welcome!</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
