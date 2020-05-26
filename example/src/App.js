import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Box } from '@chakra-ui/core'
import Basic from './screens/Basic'
import Navigation from './components/Navigation'

function App() {
  return (
    <Box maxWidth='xl' margin='auto'>
      <Router>
        <Navigation />
        <Switch>
          <Redirect from='/react-field-validation-form' to='/' />
          <Route exact path='/'>
            <Basic />
          </Route>
        </Switch>
      </Router>
    </Box>
  )
}

export default App
