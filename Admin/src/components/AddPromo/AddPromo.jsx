import React from 'react'
import './AddPromo.css'
import { useState } from 'react'
const AddPromo = () => {
    
    const [promodetails,Setpromodetails]=useState({
        promocode:"",
        discount:""
    })
    const handlechange=(event)=>{
        Setpromodetails({
            ...promodetails,
            [event.target.name]:event.target.value,
        })
    }



    
    const handlesubmit=async()=>{
      
      if(promodetails.promocode && promodetails.discount)
{    
      await fetch('http://localhost:5000/addpromo', {
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },    
        body:JSON.stringify(promodetails),        
      }).then((res)=>res.json()).then((data)=> data.success?alert(data.message):alert(data.message))
  } else{alert("Fill in both fields")}       
      Setpromodetails({
        promocode:"",
        discount:""
      })
  }
    return (
    
    <div className='addproduct'>

      <div className="item">
        <p>Promo Code</p>
        <input type="text" name='promocode' value={promodetails.promocode} onChange={handlechange} placeholder='Add code'/>
      </div>
      <div className="price">
        <div className="item">
        <p>Discount</p>
        <input type="text" name='discount' value={promodetails.discount} onChange={handlechange}  placeholder='Add Discount Percentage'/>
        </div>
      </div>

      <button onClick={()=>{handlesubmit()}} className="add">Add </button>
    </div>
  )
}

export default AddPromo
