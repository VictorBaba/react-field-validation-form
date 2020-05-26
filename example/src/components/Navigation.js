import { Button, Box } from '@chakra-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

function Navigation() {
  return (
    <>
      <Box height='2' />
      <Button variant='link' as={RouterLink} to='/'>
        Basic
      </Button>
      <Button variant='link' as={RouterLink} to='/nested'>
        Nested
      </Button>
      <Box height='2' />
    </>
  )
}

export default Navigation
