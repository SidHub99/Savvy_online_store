import React from 'react'
import './Admin.css'
import Side from '../../components/sidebar/Side'
import { Routes ,Route} from 'react-router-dom'
import Addproduct from '../../components/Addproduct/Addproduct'
import Listproduct from '../../components/Listproduct/Listproduct'
import Discounts from '../../components/discounts/Discounts'
import AddPromo from '../../components/AddPromo/AddPromo'
const Admin = () => {
  return (
    <div className='admin'>
      <Side/>
      
      <Routes>
        <Route path="/addproduct" element={<Addproduct/>}/>
        <Route path="/listproduct" element={<Listproduct/>}/>
        <Route path="/showpromos" element={<Discounts/>}/>
        <Route path='addpromo' element={<AddPromo/>}/>
      </Routes>
      
    </div>
  )
}

export default Admin
