import { Button, Box } from '@chakra-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

function Navigation() {
  return (
    <>
      <Box height='2' />
      <Box display='flex' justifyContent='space-around'>
        <Button variant='link' as={RouterLink} to='/'>
          Basic
        </Button>
        <Button variant='link' as={RouterLink} to='/nested'>
          Nested
        </Button>
        <Button variant='link' as={RouterLink} to='/array'>
          Array
        </Button>
        <Button variant='link' as={RouterLink} to='/async'>
          Async
        </Button>
      </Box>
      <Box height='2' />
    </>
  )
}

export default Navigation
