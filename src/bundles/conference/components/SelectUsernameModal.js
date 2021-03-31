import { Button, Modal, Paper, TextField } from '@material-ui/core'
import { useFormik } from 'formik'

import React, { useContext } from 'react'
import authContext, { AuthContext } from '../../../context/authContext'
import * as yup from 'yup'

const validationSchema = yup.object({
  username: yup
    .string('')
    .required(''),
  email: yup
    .string('')
    .email('')
    .required('')
})

const SelectUsernameModal = () => {
  const [authContext, dispatch] = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      username: '',
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // TODO: get this xvalues from servers
      authContext.userDetails.username = formik.values.username
      authContext.userDetails.email = formik.values.email
      authContext.userDetails.userId = 'tmp_user'
      dispatch({ type: 'SET_userDetails', payload: authContext.userDetails })
    }
  })

  return (
    <Modal
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        open={!authContext.userDetails.userId}>
        <Paper>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={formik.handleSubmit}>
                <TextField
                    id='username'
                    name='username'
                    label='username'
                    onChange={formik.handleChange}>

                </TextField>
                <TextField
                    id='email'
                    name='email'
                    label='email'
                    onChange={formik.handleChange}>

                </TextField>
                <Button disabled={formik.isSubmitting || !formik.isValid} type='submit'>
                    set name
                </Button>
            </form>
        </Paper>
    </Modal>)
}

export default SelectUsernameModal
