// import React, { useEffect, useState } from 'react'
import '../RelatedProducts/Relatedproduct.css'
// import Item from '../item/Item'

// const Relatedproducts = () => {
//   const [data,Setdata]=useState()
//   useEffect(()=>{
 
//     const call=async()=>{
//       await fetch('http://localhost:5000/popular').then((res)=>res.json()).then((data)=>Setdata(data))
//     }
//     call()
//   },[])
//   return (
//     <div className='relatedproducts'>
//         <h1> Related Products</h1>
//         <hr/>
//         <div className="items">
//             {
//                 data.map((item,i)=>{
//                 return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />})
//             }
//         </div>
      
//     </div>
//   )
// }

// export default Relatedproducts

import React from 'react'
import { useEffect,useState } from 'react'
// import data from '../assets/data'
import Item from '../item/Item'

const Relatedproducts = () => {
  const [data,SetData]=useState([])
  useEffect(()=>{
    const call=async()=>{
      await fetch('http://localhost:5000/popular').then((res)=>res.json()).then((data)=>SetData(data))
    }
    call()
  },[])
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr/> 
      <div className='items'>

        {
            data.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })
        }
      </div>
    </div>
  )
}

export default Relatedproducts
