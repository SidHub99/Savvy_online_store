import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add from '../../assets/Admin Panel Assets/Product_Cart.svg'
import list_ from '../../assets/Admin Panel Assets/Product_list_icon.svg'

const Side = () => {
  return (
    <div className='side'>
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className="items">
          <img src={add} alt="" />
          <p>Add Product</p>
        </div>
      
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className="items">
          <img src={list_} alt="" />
          <p>List Product</p>
        </div>
      
      </Link>

      <Link to={'/addpromo'} style={{textDecoration:"none"}}>
        <div className="items">
        <img src={add} alt="" />
          <p>Add Promo Codes</p>
        </div>
      
      </Link>
      
      <Link to={'/showpromos'} style={{textDecoration:"none"}}>
        <div className="items">
          <img src={list_} alt="" />
          <p>Promo Codes List</p>
        </div>
      
      </Link>
    </div>
  )
}

export default Side
