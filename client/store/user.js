import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATED_USER = 'UPDATED_USER'
const GOT_USER_ADDRESS = 'GOT_USER_ADDRESS'
const UPDATED_ADDRESS = 'UPDATED_ADDRESS'

/**
 * INITIAL STATE
 */
const defaultUser = {
  userUpdate: {},
  address: {}
}

/**
 * at the end of the me thunk state will equal { id: 4, email: ... } (aka CURRENT
 */

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

const updatedUser = userUpdate => {
  return {
    type: UPDATED_USER,
    userUpdate
  }
}

const gotUserAddress = address => {
  return {
    type: GOT_USER_ADDRESS,
    address
  }
}

const updatedAddress = address => {
  return {
    type: UPDATED_ADDRESS,
    address
  }
}

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const updateUser = user => {
  return async dispatch => {
    try {
      const data = await axios.put(`/api/users/profile/${user.id}/edit`, {
        user
      })
      console.log('DATA', data)
      dispatch(updatedUser(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getUserAddress = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/profile/${id}`)
      dispatch(gotUserAddress(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateAddress = (address, id) => {
  return async dispatch => {
    try {
      const data = await axios.put(`/api/users/profile/${id}/edit/address`, {
        address
      })
      dispatch(updatedAddress(data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return action.defaultUser
    case UPDATED_USER:
      return {
        ...state,
        userUpdate: action.userUpdate
      }
    case GOT_USER_ADDRESS:
      return {
        ...state,
        address: action.address
      }
    case UPDATED_ADDRESS:
      return {
        ...state,
        address: action.address
      }
    default:
      return state
  }
}
