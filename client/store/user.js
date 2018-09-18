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
    const {data} = await axios.put(`/api/users/profile/${user.id}/edit`, user)
    dispatch(updatedUser(data))
  }
}

export const getUserAddress = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/profile/${id}`)
    dispatch(gotUserAddress(data))
  }
}

export const updateAddress = (address, id) => {
  return async dispatch => {
    console.log('address', address)
    const data = await axios.put(`/api/users/profile/${id}/edit`, address)
    console.log('DATA', data)
    dispatch(updatedAddress(data))
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
      return defaultUser
    case UPDATED_USER:
      return action.userUpdate
    case GOT_USER_ADDRESS:
      return {
        ...state,
        address: action.address
      }
    case UPDATED_ADDRESS:
      return {
        address: action.address
      }
    default:
      return state
  }
}
