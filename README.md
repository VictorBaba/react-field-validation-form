# react-field-validation-form

> Custom React Hook to manage field and form level validation using Yup with support for nested data, arrays and async values.

[![NPM](https://img.shields.io/npm/v/react-field-validation-form.svg)](https://www.npmjs.com/package/react-field-validation-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-field-validation-form
```

## Usage

```jsx
import React from 'react'
import { string } from 'yup'
import useFieldValidationForm from 'react-field-validation-form'
import { Button, Box, FormLabel, Input } from '@chakra-ui/core'

function Basic() {
  const {
    formData,
    errors: formErrors,
    handleChange,
    handleSubmit,
    handleValidateField
  } = useFieldValidationForm({
    initialValues: {
      email: '',
      password: ''
    },

    validationSchema: {
      email: string().email('Format invalid!').required('Field Required!'),
      password: string()
        .required('Field Required!')
        .min(3, 'Minimum of 3 characters')
    },

    callBack: (outputValues) => {
      console.log(outputValues)
    }
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
    </Box>
  )
}

export default Basic
```

##### Check examples folder for in depth usage.

##### Or [See them in action](https://victorbaba.github.io/react-field-validation-form)

## License

MIT © [VictorBaba](https://github.com/VictorBaba)
