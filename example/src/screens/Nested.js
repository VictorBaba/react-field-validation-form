import React, { useState } from 'react'
import { string } from 'yup'
import useFieldValidationForm from 'react-field-validation-form'
import { Button, Box, FormLabel, Input } from '@chakra-ui/core'

function Nested() {
  const [values, setValues] = useState(null)

  const {
    formData,
    errors: formErrors,
    handleChange,
    handleSubmit,
    handleValidateField,
  } = useFieldValidationForm({
    initialValues: {
      user: {
        name: '',
        email: '',
      },
    },

    validationSchema: {
      user: {
        name: string()
          .required('Field Required!')
          .min(3, 'Minimum of 3 characters'),
        email: string().required('Field Required!').email('Format invalid!'),
      },
    },

    callBack: (outputValues) => {
      setValues(outputValues)
    },
  })

  return (
    <Box>
      <Box height='8' />
      <form method='POST' onSubmit={handleSubmit}>
        <FormLabel htmlFor='name'>Name</FormLabel>
        <Input
          type='name'
          name='user.name'
          id='name'
          value={formData.user.name}
          onChange={handleChange}
          onInput={handleValidateField}
        />

        <div>{formErrors?.user?.name}</div>
        <Box height='8' />

        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input
          type='text'
          name='user.email'
          id='email'
          value={formData.user.email}
          onChange={handleChange}
          onInput={handleValidateField}
        />
        <div>{formErrors?.user?.email}</div>

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

export default Nested
