import React, { useState } from 'react'
import { string } from 'yup'
import useFieldValidationForm from 'react-field-validation-form'
import { Button, Box, FormLabel, Input } from '@chakra-ui/core'

function Basic() {
  const [values, setValues] = useState(null)

  const {
    formData,
    errors: formErrors,
    handleChange,
    handleSubmit,
    handleValidateField,
  } = useFieldValidationForm({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: {
      email: string().required('Field Required!').email('Format invalid!'),
      password: string()
        .required('Field Required!')
        .min(3, 'Minimum of 3 characters'),
    },

    callBack: (outputValues) => {
      setValues(outputValues)
    },
  })

  return (
    <Box>
      <Box height='8' />
      <form method='POST' onSubmit={handleSubmit}>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input
          type='text'
          name='email'
          id='email'
          value={formData.email}
          onChange={handleChange}
          onBlur={handleValidateField}
        />
        <div>{formErrors?.email}</div>

        <Box height='8' />
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input
          type='password'
          name='password'
          id='password'
          value={formData.password}
          onChange={handleChange}
          onBlur={handleValidateField}
        />
        <div>{formErrors?.password}</div>
        <Box height='8' />

        <Button variant='solid' type='submit'>
          submit{' '}
        </Button>
      </form>

      <Box height='8' />
      <Box>Output Values: {values && JSON.stringify(values, null, 2)}</Box>
    </Box>
  )
}

export default Basic
