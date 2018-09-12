import React from 'react'

import {Navbar} from './components'
import {Link} from 'react-router-dom'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
