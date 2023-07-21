/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function UpdateUser ({idUpdate, load, setLoad}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultUserById = async (id) => {
    const response = await axios.get(`http://localhost:4000/api/users/consultUsers/${id}`);
    console.log(response.data.user);
    setFormData(response.data.user);
  }

  useEffect(() => {
      if (idUpdate) {
        consultUserById(idUpdate);
      }
      setOpen(idUpdate ? true : false);
  }, [idUpdate])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <Formik
        enableReinitialize
        initialValues={{
            id: idUpdate,
            names: formData.names || '',
            email: formData.email || '',
            password: formData.password || '',
            idRol: formData.idRol || "",
        }}
        validationSchema={Yup.object({
            names: Yup.string()                
                .min(3, 'Debe tener minimo 3 caracteres')
                .required('Campo Obligatorio'),
            email: Yup.string()
                .email('Dirección de email invalida')
                .required('Campo Obligatorio'),
            password: Yup.string()                
                .min(8, 'La contraseña debe ser minimo 8 caracteres')
                .required('Campo Obligatorio'),
            idRol: Yup.number()
                .required('Campo Obligatorio'),
                
            
        })}
        // eslint-disable-next-line no-unused-vars
        onSubmit={async(values, { setSubmitting }) => {

            const response = await axios.put('http://localhost:4000/api/users/updateUser', values);
            // const response = await axios.put('http://localhost:3000/api/users/updateUser/' + idUpdate, values);
            setLoad(!load);
            setOpen(false);
        }}
       >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
        <form onSubmit={handleSubmit}>        
            <DialogTitle id="alert-dialog-title">
            {"Actualiza un usuario"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">

            <TextField                        
                        sx={{mt: 1}}
                        fullWidth
                        id="outlined-basic"
                        name="names"        //se pone el nombre del campo segun la base de datos 
                        label="Nombres" 
                        variant="outlined"
                        onChange={handleChange}
                        value={values.names}
                        error={errors.names}
                        helperText={errors.names}
            />
                    
                    <TextField 
                        sx={{mt: 3}}
                        fullWidth
                        id="outlined-basic"
                        name="email"        
                        label="Email" 
                        type="email"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.email}
                        error={errors.email}
                        helperText={errors.email}
                    />
                    <TextField 
                        sx={{mt: 3}}
                        fullWidth
                        id="outlined-basic"
                        name="password"        
                        label="Contraseña"
                        type="password" 
                        variant="outlined"
                        onChange={handleChange}
                        value={values.password}
                        error={errors.password}
                        helperText={errors.password}
                    />
                    
                    <TextField 
                        sx={{mt: 3}}
                        fullWidth
                        id="outlined-basic"
                        name="idRol"        
                        label="Rol"
                        type="number" 
                        variant="outlined"
                        onChange={handleChange}
                        value={values.idRol}
                        error={errors.idRol}
                        helperText={errors.idRol}
                        
                    /> 

            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button type='submit'>
                Actualizar
            </Button>
            </DialogActions>
        </form>
        )}
        </Formik>
      </Dialog>
    </div>
  );
}