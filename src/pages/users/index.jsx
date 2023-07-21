import Container from '@mui/material/Container';
import CreateUser from '../../components/molecules/Users/CreateUser/CreateUser';
import ListUser from '../../components/molecules/Users/ListUser/ListUser';
import { useState } from 'react';
import UpdateUser from '../../components/molecules/Users/UpdateUser/UpdateUser';
//import DeleteUser from '@components/molecules/Users/DeleteUser/DeleteUser';


export default function Users() {

    
    const [load, setLoad] = useState(false)
    
    const [idUpdate, setIdUpdate] = useState("");

    return (
      
    //Diseño de titulos de la tabla users
    <Container maxWidth="lg" sx={{mt: 5}}>
        
        <CreateUser load={load} setLoad={setLoad} />   
                       
        <ListUser load={load} setLoad={setLoad} setIdUpdate={setIdUpdate} />
            
        <UpdateUser idUpdate={idUpdate} load={load} setLoad={setLoad}  />
        
        </Container>
  );
}