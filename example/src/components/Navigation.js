import { Button, Box } from '@chakra-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

function Navigation() {
  return (
    <>
      <Box height='2' />
      <Box display='flex' justifyContent='space-around'>
        <Button
          variant='link'
          as={RouterLink}
          to='/react-field-validation-form'
        >
          Basic
        </Button>
        <Button
          variant='link'
          as={RouterLink}
          to='/react-field-validation-form/nested'
        >
          Nested
        </Button>
      </Box>
      <Box height='2' />
    </>
  )
}

export default Navigation
