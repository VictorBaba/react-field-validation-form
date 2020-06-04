import compare from 'just-compare'
import { useEffect, useState } from 'react'
import { object } from 'yup'
import PropTypes from 'prop-types/prop-types'

const validationPropTypes = {
  initialValues: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.objectOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.exact({
          id: PropTypes.string,
          name: PropTypes.string
        })
      )
    ])
  ),
  validationSchema: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.objectOf(PropTypes.object)
    ])
  ),
  callBack: PropTypes.func.isRequired
}

export default function useFieldValidationForm({
  initialValues,
  validationSchema,
  callBack
}) {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isTouched, setTouched] = useState(false)
  const [isOnSubmitCalled, setOnSubmitCalled] = useState(false)

  useEffect(() => {
    PropTypes.checkPropTypes(
      validationPropTypes,
      { callBack, initialValues, validationSchema },
      'useFieldValidationForm',
      useFieldValidationForm
    )
  }, [initialValues, callBack, validationSchema])

  useEffect(() => {
    const areInitialValuesEqual = compare(formData, initialValues)

    if (!areInitialValuesEqual && !isTouched) {
      setFormData(initialValues)
    }
  }, [initialValues, formData, isTouched])

  useEffect(() => {
    const errorState = Object.values(errors)
      .map((error) =>
        typeof error === 'object' && error !== null
          ? Object.values(error)
          : error
      )
      .flat()
      .filter((error) => error !== null)

    const hasErrors = errorState.length > 0 || Object.keys(errors).length === 0

    const formDataKeys = reduceObjectToArray(formData)

    const errorsKeys = reduceObjectToArray(errors)

    const areFieldsValidated = formDataKeys.every(
      (v) => errorsKeys.indexOf(v) !== -1
    )

    if (hasErrors && areFieldsValidated) {
      setOnSubmitCalled(false)
    }

    if (isOnSubmitCalled && isTouched && !hasErrors && areFieldsValidated) {
      callBack(formData)
      setFormData(initialValues)
      setTouched(false)
      setOnSubmitCalled(false)
      setErrors({})
    }
  }, [
    callBack,
    errors,
    initialValues,
    formData,
    isTouched,
    isOnSubmitCalled,
    validationSchema
  ])

  function reduceObjectToArray(obj) {
    return Object.entries(obj)
      .map(([key, value]) => {
        const isObject = typeof value === 'object' && !Array.isArray(value)
        const isArray = Array.isArray(value)

        if (value && isObject) {
          return Object.keys(value)
        }
        if (isArray) {
          return value.map((nestedKey) => nestedKey.id)
        }
        return key
      })
      .flat()
  }

  function getValueByType(type, value) {
    if (type === 'number') {
      return parseInt(value)
    }
    return value
  }

  let nestedSchemaObject = {}
  const schemaObject = Object.entries(validationSchema).reduce(
    (acc, [key, value]) => {
      if (!Object.keys(value).includes('_deps')) {
        nestedSchemaObject = Object.entries(value).reduce(
          (nestedAcc, [nestedKey, nestedValue]) => ({
            [nestedKey]: { [nestedKey]: nestedValue },
            ...nestedAcc
          }),
          {}
        )
        return acc
      }
      return {
        [key]: { [key]: value },
        ...acc
      }
    },
    {}
  )

  const validationSchemaObject = {
    ...schemaObject,
    ...nestedSchemaObject
  }

  async function handleValidateField(e) {
    const { value, name } = e.target
    const isObject = name.includes('.')
    if (isObject) {
      const [objectKey, objectValue] = name.split('.')

      const fieldSchema = object().shape(validationSchemaObject[objectValue])

      try {
        await fieldSchema.validate({ [objectValue]: value })
        setErrors((prevState) => ({
          ...prevState,
          [objectKey]: {
            ...prevState[objectKey],
            [objectValue]: null
          }
        }))
      } catch (e) {
        setErrors((prevState) => ({
          ...prevState,
          [objectKey]: {
            ...prevState[objectKey],
            [objectValue]: e.message
          }
        }))
      }
    } else {
      const fieldSchema = object().shape(validationSchemaObject[name])
      try {
        await fieldSchema.validate({ [name]: value })
        setErrors((prevState) => ({ ...prevState, [name]: null }))
      } catch (e) {
        setErrors((prevState) => ({ ...prevState, [name]: e.message }))
      }
    }
  }

  function handleChange(e) {
    const { name, value, type } = e.target

    const isObject = name.includes('.')
    if (isObject) {
      const [objectKey, objectValue] = name.split('.')

      setFormData((prevState) => ({
        ...prevState,
        [objectKey]: {
          ...formData[objectKey],
          [objectValue]: getValueByType(type, value)
        }
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: getValueByType(type, value)
      }))
    }
    setTouched(true)
    setOnSubmitCalled(false)
  }

  function handleArrayOnChange({ e, id }) {
    const { name, value } = e.target

    const newArray = formData[name].map((currentValue) =>
      currentValue.id === id ? { ...currentValue, name: value } : currentValue
    )

    setFormData((prevState) => ({ ...prevState, [name]: newArray }))
    setTouched(true)
    setOnSubmitCalled(false)
  }

  function handleArrayPushField({ key, data }) {
    setFormData((prevState) => ({
      ...prevState,
      [key]: [...formData[key], data]
    }))
    setTouched(true)
    setOnSubmitCalled(false)
  }

  function handleArrayRemoveField({ key, id }) {
    setFormData((prevState) => ({
      ...prevState,
      [key]: prevState[key].filter((field) => field.id !== id)
    }))
    setErrors((prevErrors) => {
      if (prevErrors?.[key]?.[id]) delete prevErrors[key][id]
      return prevErrors
    })
    setTouched(true)
    setOnSubmitCalled(false)
  }

  async function handleValidateArrayField({ e, id }) {
    const { name, value } = e.target
    const fieldSchema = object().shape(validationSchemaObject[name])
    try {
      await fieldSchema.validate({ [name]: value })
      setErrors((prevState) => ({
        ...prevState,
        ...(prevState[name]
          ? {
              [name]: {
                ...prevState[name],
                [id]: null
              }
            }
          : {
              [name]: {
                [id]: null
              }
            })
      }))
    } catch (e) {
      setErrors((prevState) => ({
        ...prevState,
        ...(prevState[name]
          ? {
              [name]: {
                ...prevState[name],
                [id]: e.message
              }
            }
          : {
              [name]: {
                [id]: e.message
              }
            })
      }))
    }
  }

  function handleValidateSchema(schema) {
    const errorsKeys = reduceObjectToArray(errors)

    Object.entries(schema).forEach(([key, value]) => {
      const isObject =
        typeof formData[key] === 'object' && !Array.isArray(formData[key])
      const isArray = Array.isArray(formData[key])
      if (isArray) {
        if (formData[key].length) {
          formData[key].map(({ id, name }) => {
            if (!errorsKeys.includes(id)) {
              handleValidateArrayField({
                e: { target: { name: key, value: name } },
                id
              })
            }
          })
        }
      }

      if (isObject) {
        Object.keys(value).forEach((nestedKey) => {
          if (!errorsKeys.includes(nestedKey)) {
            handleValidateField({
              target: {
                name: `${key}.${nestedKey}`,
                value: formData[key][nestedKey]
              }
            })
          }
        })
      }

      if (!isArray && !isObject && !errorsKeys.includes(key)) {
        handleValidateField({ target: { name: key, value: formData[key] } })
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleValidateSchema(validationSchema)
    setOnSubmitCalled(true)
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    handleValidateField,
    handleArrayOnChange,
    handleArrayPushField,
    handleArrayRemoveField,
    handleValidateArrayField,
    errors
  }
}
