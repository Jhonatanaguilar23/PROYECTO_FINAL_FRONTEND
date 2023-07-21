//componente de usuarios
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';

// eslint-disable-next-line react/prop-types
export default function ListUser({load, setLoad, /*setIdDelete*/ setIdUpdate }) {

    const [rows, setRows] = useState([]);

    
    //actualizar cada que se realice un cambio
    useEffect (() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/api/users/consultUsers/');
            console.log(response.data.users);
            setRows(response.data.users);
        }
        fetchData();
            //podemos hacer un disparador para agregar datos cuando guarde otro
    },[load]) 
    
    /*const handleDelete = async (id) => {
        setIdDelete(id);  //estado
    }*/

    //eliminar usuario
     const handleDeleteUser =  (id) => {
        Swal.fire({
          title: '¿CONFIRMA ELIMINAR USUARIO?',
          html: "<i> Esta Seguro de ELIMINAR el usuario: <strong>"+id.names+"</strong></i>",
          icon: 'warning',
          iconColor:'red',
          confirmButtonText: 'Si',
          confirmButtonColor: 'red',
          showCancelButton: true,
          cancelButtonText: "No",
          cancelButtonColor: 'blue'
        }).then((res) => {
          if (res.isConfirmed) {
            axios.delete(`http://localhost:4000/api/users/deleteUser/${id.id}`)
            setLoad(!load);
            Swal.fire({
              text: 'Usuario Eliminado con exito',
              icon: 'success',
              timer:  3000,
            });    
          } else if (res.isDismissed) {
            Swal.fire({
              title: 'Opss!',
              html: "<i> El usuario: <strong>"+id.names+"</strong> No Fue Eliminado</i>",
              icon: 'error',
              iconColor: 'red',
              timer:  3000,
            }); 
          }
        });
       }
    
    //Actualizar usuario
    const handleUpdateUser = async(id) => {
        await setIdUpdate(id)

    }

    return (

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell >Nombres</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Rol</TableCell>
            <TableCell >Acciones</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              
              <TableCell component="th" scope="row">{row.names}</TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.role.description}</TableCell>
              <TableCell >                      
                        
                        {/* BOTON CON VENTADA DE ALERTA  */}
                        <IconButton color="primary" aria-label="Eliminar"  onClick={() => {handleDeleteUser (row)}}> 
                          <Delete/>
                        </IconButton>           

                        <IconButton color="primary" aria-label="Editar" onClick={() => {handleUpdateUser(row.id)}}  >
                          <Edit/>
                        </IconButton>
                        
              </TableCell>

                     
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}


