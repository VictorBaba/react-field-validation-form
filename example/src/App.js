import { Box } from '@chakra-ui/core'
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import Basic from './screens/Basic'
import Nested from './screens/Nested'
import WithArray from './screens/WithArray'
import Async from './screens/Async'

function App() {
  return (
    <Box maxWidth='xl' margin='auto'>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path='/'>
            <Basic />
          </Route>
          <Route path='/nested'>
            <Nested />
          </Route>
          <Route path='/array'>
            <WithArray />
          </Route>
          <Route path='/async'>
            <Async />
          </Route>
        </Switch>
      </Router>
    </Box>
  )
}

export default App
