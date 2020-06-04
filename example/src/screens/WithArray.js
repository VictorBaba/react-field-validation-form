import React, { useState } from 'react'
import { string } from 'yup'
import useFieldValidationForm from 'react-field-validation-form'
import {
  Button,
  Box,
  FormLabel,
  Input,
  IconButton,
  Flex,
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
    handleArrayPushField,
  } = useFieldValidationForm({
    initialValues: {
      name: '',
      food: [{ id: '1', name: '' }],
    },

    validationSchema: {
      name: string()
        .required('Field Required!')
        .min(3, 'Minimum of 3 characters'),
      food: string()
        .required('Field Required!')
        .min(2, 'Minimum of 2 characters'),
    },

    callBack: (outputValues) => {
      const food = outputValues.food.reduce(
        (acc, { id, name }) => [...acc, name],
        []
      )

      setValues({ ...outputValues, food })
    },
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
          onInput={handleValidateField}
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
                  onInput={(e) =>
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
              data: { id: generate(), name: '' },
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
