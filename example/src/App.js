import { Box } from '@chakra-ui/core'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
          <Route exact path='/react-field-validation-form'>
            <Basic />
          </Route>
          <Route path='/react-field-validation-form/nested'>
            <Nested />
          </Route>
          <Route path='/react-field-validation-form/array'>
            <WithArray />
          </Route>
          <Route path='/react-field-validation-form/async'>
            <Async />
          </Route>
        </Switch>
      </Router>
    </Box>
  )
}

export default App
