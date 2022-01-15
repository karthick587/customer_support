import React, { useEffect, useState } from 'react';
import {Formik,Form,Field} from 'formik';
import * as Yup from 'yup';

function FormikYup() {
    

    
   
    const getvalue=({firstname,lastname,email})=>{
console.log(firstname)
console.log(lastname)
console.log(email)
    }

const [initialValues]=useState(
    {  
        firstname:"karthickraja",
        lastname:'raja',
        email:'karthickduarai587@gmail.com'
    })
useEffect(()=>{

})

    return (
        <div>
            <Formik
            initialValues = {initialValues}
            onSubmit = {value =>getvalue(value)}
            >
          
                <Form >
                 <Field name="firstname" />
                
                 <Field name="lastname" />
                
                 <Field name="email"  />
                
                 <button type="submit" className="btn btn-success">Submit</button>
                 </Form>
          

            </Formik>
        </div>
    )
}

export default FormikYup