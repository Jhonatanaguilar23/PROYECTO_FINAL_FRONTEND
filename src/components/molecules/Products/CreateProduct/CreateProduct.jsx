/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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


export default function CreateProduct({load, setLoad}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
            
      <Button
        sx={{     
          backgroundColor: 'inheret',
          color: 'green',
          fontWeight: 600,
        }}
        onClick={handleClickOpen}
      >
        Crear Producto           
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
    <Formik
        initialValues={{ 
            name: '', 
            description: '',
            unitValue: '',
            idUser: '',
        }}
        
        validationSchema={Yup.object({
            name: Yup.string()                
                .min(7, 'Debe tener minimo 7 caracteres')
                .required('Por favor ingrese un nombre'),
            description: Yup.string()
                .min(7, 'Debe tener minimo 7 caracteres')
                .required('Por favor ingrese una caracteristica'),
            unitValue: Yup.number()                
                .required('Por favor ingrese un valor'),
            idUser: Yup.number()
                .required('Por favor ingrese su ID'),
        })}
        
        //codigo para enviar datos
        onSubmit={async(values, { setSubmitting }) => {            
            const response = await axios.post('http://localhost:4000/api/products/saveProducts/', values);
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
        
    }) => (
          <form onSubmit={handleSubmit}>
              <DialogTitle id="alert-dialog-title">
              {"Crear  Producto"}
              </DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  
                  <TextField                        
                      sx={{mt: 1}}
                      fullWidth
                      id="outlined-basic"
                      name="name"        //se pone el nombre del campo segun la base de datos 
                      label="Nombre" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.name}
                      error={errors.name}
                      helperText={errors.name}
                  />
                  
                  <TextField 
                      sx={{mt: 3}}
                      fullWidth
                      id="outlined-basic"
                      name="description"
                      label="Detalles del Producto" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.description}
                      error={errors.description}
                      helperText={errors.description}
                  />
                  <TextField 
                      sx={{mt: 3}}
                      fullWidth
                      id="outlined-basic"
                      name="unitValue"        
                      label="Valor Unitario"
                      type="number" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.unitValue}
                      error={errors.unitValue}
                      helperText={errors.unitValue}
                  />
                  
                  <TextField 
                      sx={{mt: 3}}
                      fullWidth
                      id="outlined-basic"
                      name="idUser"        
                      label="Creado por ID:"
                      type="number" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.idUser}
                      error={errors.idUser}
                      helperText={errors.idUser}
                      
                  />
                  
                  
              </DialogContentText>
              </DialogContent>
              <DialogActions>          
                <Button
                  type='submit'
                  sx={{             //ESTILO BOTON REGISTRAR
                    backgroundColor: 'inheret',
                    color: 'green',
                    fontWeight: 600,
                  }}
                                    
                >
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