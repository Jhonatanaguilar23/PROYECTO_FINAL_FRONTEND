/* eslint-disable no-unused-vars */
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
export default function ListProduct({load, setLoad, setIdUpdate }) {

    const [rows, setRows] = useState([]);

    
    //actualizar cada que se realice un cambio
    useEffect (() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/api/products/consultProducts/');
            console.log(response.data.products);
            setRows(response.data.products);
        }
        fetchData();
            //podemos hacer un disparador para agregar datos cuando guarde otro
    },[load]) 
    
    
    //eliminar usuario
     const handleDeleteProduct =  (id) => {
        Swal.fire({
          title: '¿Eliminar El Producto?',
          html: "<i><strong>"+id.name+"</strong></i>",
          icon: 'info',
          iconColor:'inheret',
          confirmButtonText: 'Si',
          confirmButtonColor: 'inheret',
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: 'inheret'
        }).then((res) => {
          if (res.isConfirmed) {
            axios.delete(`http://localhost:4000/api/products/deleteProduct/${id.id}`)
            setLoad(!load);
            Swal.fire({
              text: 'Producto Eliminado',
              icon: 'success',
              iconColor:'inheret',
              timer:  3000,
            });    
          } else if (res.isDismissed) {
            Swal.fire({
              title: 'Se Cancela Eliminacion',
              icon: 'error',
              iconColor: 'inheret',              
              timer:  3000,
            }); 
          }
        });
       }
    
    //Actualizar usuario
    const handleUpdateProduct = async(id) => {
        await setIdUpdate(id)

    }

    return (

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell >name</TableCell>
            <TableCell >description</TableCell>
            <TableCell >unitValue</TableCell>            
            <TableCell >Acciones</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell >{row.description}</TableCell>
              <TableCell >{row.unitValue}</TableCell>
              

              <TableCell >
                        
                  {/* BOTON CON VENTADA DE ALERTA  */}
                  <IconButton color= "primary" aria-label="Eliminar"  onClick={() => {handleDeleteProduct (row)}}> 
                    <Delete/>
                  </IconButton>           

                  <IconButton     //ESTILO BOTONES ELIMINAR Y ACTUALIZAR
                  color="primary"
                  aria-label="Editar"
                  onClick={() => { handleUpdateProduct(row.id) }}  >
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