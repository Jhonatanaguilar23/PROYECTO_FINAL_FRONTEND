import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import  ResponsiveAppBar  from '@components/molecules/ResponsiveAppBar/ResponsiveAppBar'
import Home from '@pages/home/index.jsx'
import Users from '@pages/users'
import Products from '@pages/products'
import Costumers from '@pages/costumers'
import Quotes from '@pages/quotes'

import '@assets/app.css'


function App() {


    return (
        <Router>
            <ResponsiveAppBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/usuarios' element={<Users />} />
                <Route path='/productos' element={<Products />} />
                <Route path='/clientes' element={<Costumers />} />
                <Route path='/cotizaciones' element={<Quotes />} />
            </Routes>
        </Router>


  )
}

export default App
