import { Box } from '@chakra-ui/core'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import Basic from './screens/Basic'
import Nested from './screens/Nested'

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
        </Switch>
      </Router>
    </Box>
  )
}

export default App
