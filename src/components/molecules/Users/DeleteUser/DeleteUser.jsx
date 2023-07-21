/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

/*const DeleteUser = ({idDelete, load, setLoad}) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:4000/api/users/deleteUser/${idDelete}`);
        setLoad(!load);
        setOpen(false);

        Swal.fire(
            '¡Info!',
            'Usuario eliminado correctamente',
            'success'
          )
    }

    useEffect(() => {
        setOpen(idDelete ? true : false);
    }, [idDelete])
    

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                ¿Está seguro de eliminar este usuario?
            </DialogTitle>
            <DialogActions>
                <Button type='submit' variant='contained' color='error' onClick={handleDelete}>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    )
}*/

//export default DeleteUser;