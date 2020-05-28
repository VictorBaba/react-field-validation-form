# react-field-validation-form

> Custom React Hook to manage field and form level validation using Yup with support for nested data, arrays and async values.

[![NPM](https://img.shields.io/npm/v/react-field-validation-form.svg)](https://www.npmjs.com/package/react-field-validation-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-field-validation-form
```

## Usage

#### Basic

```jsx
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
    handleValidateField
  } = useFieldValidationForm({
    initialValues: {
      email: '',
      password: ''
    },

    validationSchema: {
      email: string().required('Field Required!').email('Format invalid!'),
      password: string()
        .required('Field Required!')
        .min(3, 'Minimum of 3 characters')
    },

    callBack: (outputValues) => {
      setValues(outputValues)
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

      <Box height='8' />
      <Box>Output Values: {values && JSON.stringify(values, null, 2)}</Box>
    </Box>
  )
}

export default Basic
```

#### Nested Object

```jsx
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
    handleValidateField
  } = useFieldValidationForm({
    initialValues: {
      user: {
        name: '',
        email: ''
      }
    },

    validationSchema: {
      user: {
        name: string()
          .required('Field Required!')
          .min(3, 'Minimum of 3 characters'),
        email: string().required('Field Required!').email('Format invalid!')
      }
    },

    callBack: (outputValues) => {
      setValues(outputValues)
    }
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
          onBlur={handleValidateField}
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
          onBlur={handleValidateField}
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
```

#### With Array

```jsx
import React, { useState } from 'react'
import { string } from 'yup'
import useFieldValidationForm from 'react-field-validation-form'
import {
  Button,
  Box,
  FormLabel,
  Input,
  IconButton,
  Flex
} from '@chakra-ui/core'
import { generate } from 'shortid'

function WithArray() {
  const [values, setValues] = useState(null)

  const {
    formData,
    errors: formErrors,
    handleChange,
    handleSubmit,
    handleValidateField,
    handleArrayOnChange,
    handleValidateArrayField,
    handleArrayRemoveField,
    handleArrayPushField
  } = useFieldValidationForm({
    initialValues: {
      name: '',
      food: [{ id: '1', name: '' }]
    },

    validationSchema: {
      name: string()
        .required('Field Required!')
        .min(3, 'Minimum of 3 characters'),
      food: string()
        .required('Field Required!')
        .min(2, 'Minimum of 2 characters')
    },

    callBack: (outputValues) => {
      const food = outputValues.food.reduce(
        (acc, { id, name }) => [...acc, name],
        []
      )

      setValues({ ...outputValues, food })
    }
  })

  return (
    <Box>
      <Box height='8' />
      <form method='POST' onSubmit={handleSubmit}>
        <FormLabel htmlFor='name'>Name</FormLabel>
        <Input
          type='name'
          name='name'
          id='name'
          value={formData.name}
          onChange={handleChange}
          onBlur={handleValidateField}
        />

        <div>{formErrors?.name}</div>
        <Box height='8' />

        {formData.food.map((foodType, index) => (
          <Box key={index}>
            <Flex direction='column'>
              <FormLabel htmlFor='food'>
                Preferred food No: {index + 1}
              </FormLabel>
              <Flex>
                <Input
                  type='text'
                  name='food'
                  id={foodType.id}
                  value={foodType.name}
                  onChange={(e) =>
                    handleArrayOnChange({ e, id: foodType.id, index })
                  }
                  onBlur={(e) =>
                    handleValidateArrayField({ e, id: foodType.id })
                  }
                />

                {formData.food.length > 1 && (
                  <IconButton
                    aria-label='Remove Food'
                    icon='close'
                    onClick={() =>
                      handleArrayRemoveField({ key: 'food', id: foodType.id })
                    }
                    marginLeft='2'
                  />
                )}
              </Flex>
              <Box>{formErrors?.food?.[foodType.id]}</Box>
            </Flex>
            <Box height='8' />
          </Box>
        ))}

        <Button
          onClick={() =>
            handleArrayPushField({
              key: 'food',
              data: { id: generate(), name: '' }
            })
          }
        >
          Add new type of Food
        </Button>

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

export default WithArray
```

#### Check examples folder for in depth usage.

#### Or [See them in action](https://victorbaba.github.io/react-field-validation-form)

## License

MIT © [VictorBaba](https://github.com/VictorBaba)
