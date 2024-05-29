import React from 'react'
import remove from '../../assets/Admin Panel Assets/cross_icon.png'
import './Discounts.css'
import { useState,useEffect } from 'react'
const Discounts = () => {
    const [allproducts,Setallproducts]=useState([])
    const getdata=async()=>{
      await fetch('http://localhost:5000/getpromos').then((response)=>response.json()).then((data)=>Setallproducts(data))
    }
    const removeprod=async(code)=>{
      await fetch('http://localhost:5000/deletepromo',
        {
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({promocode:code})
        }
    )
    getdata()
    }
    useEffect(()=>{
      getdata()
    },[])
    return (
      <div className='list-product'>
        <h1>List Promo codes</h1>
        <div className="mains">
        <p>Promo Code</p>
        <p>Discount</p>
        <p>Remove</p>
        </div>
        
          <hr/>
          {
            allproducts.map((product,index)=>{
              return <>
              <div key={index} className="format mains">
                
                <h3>{product.promocode}</h3>
                <p>{product.discount}%</p>  
                <img src={remove} onClick={()=>{removeprod(product.promocode)}} alt="" className='removes' />
                
              </div>
              <hr />
              </>
            })
          }
        
        
      </div>
    )
  
}

export default Discounts
