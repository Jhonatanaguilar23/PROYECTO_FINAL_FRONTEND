import Container from '@mui/material/Container';
import CreateProduct from '../../components/molecules/Products/CreateProduct/CreateProduct'
import ListProduct from '../../components/molecules/Products/ListProduct/ListProduct';
import { useState } from 'react';
import UpdateProduct from '../../components/molecules/Products/UpdateProduct/UpdateProduct';



export default function Products() {

        {/* para actulizar automaticamente la tabla al realizar un cambio */}
    const [load, setLoad] = useState(false)
    //const [idDelete, setIdDelete] = useState('');
    const [idUpdate, setIdUpdate] = useState("");

    return (
      
    //Diseño de titulos de la tabla users
    <Container maxWidth="lg" sx={{mt: 5}}>
        
        <CreateProduct load={load} setLoad={setLoad} />                  
        <ListProduct load={load} setLoad={setLoad} setIdUpdate={setIdUpdate} />           
        <UpdateProduct idUpdate={idUpdate} load={load} setLoad={setLoad}  />
        </Container>
  );
}