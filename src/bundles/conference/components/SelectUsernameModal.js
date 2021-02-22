import { Modal } from '@material-ui/core'
import { Formik, Field, Form } from 'formik';

import React from 'react'

const SelectUsernameModal = ({authContext}) =>{
    return (<>
    <Modal>
        <Formik initialValues={{}} onSubmit={()=>{}}>
            
        </Formik>
    </Modal>
    </>)
}

export default SelectUsernameModal