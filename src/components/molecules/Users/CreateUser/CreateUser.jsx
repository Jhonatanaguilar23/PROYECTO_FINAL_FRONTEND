/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';    //para los formularios
import * as Yup from 'yup';        //para las validaciones inputs de los formularios
import axios from 'axios';


export default function CreateUser({load, setLoad}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Crear Usuario           {/*nombre del dialogo*/}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
    <Formik
        initialValues={{ 
            names: '', 
            email: '',
            password: '',
            idRol: '',
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
        
        //codigo para enviar datos
        onSubmit={async(values, { setSubmitting }) => {            
            const response = await axios.post('http://localhost:4000/api/users/saveUsers', values);
            console.log(response);
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
                {"Crear un nuevo usuario"}                 {/*titulo del dialogo */}
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
                    Crear
                </Button>
                </DialogActions>
            </form>
            )}
            </Formik>
        </Dialog>
    </div>
  );
}