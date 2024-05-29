import {React, createContext, useEffect} from "react";
import { useState } from "react";
export const ShopContext=createContext(null);

    const getdefaultcart=()=>{
        let cart={}
        for(let item=0;item<300+1;item++){
            cart[item]=0
        }
        return cart
    }
const ShopContextProvider=(props)=>{
    const [all_product,Setall_product]=useState([])
    useEffect(()=>{
        const call=async()=>await fetch("http://localhost:5000/getproducts").then((response)=>response.json()).then((data)=>Setall_product(data))
        call()
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:5000/getcartdata",{
                method:'POST',
                headers:{
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:""
            }).then((res)=>res.json()).then((data)=>setCartItems(data))
        }
    },[])

    const [cartItems,setCartItems]=useState(getdefaultcart())
    
    // const addtocart=(item,size)=>{
    //     setCartItems((prev)=>({...prev,[item]:prev[item]+1}))
    //     if(localStorage.getItem('auth-token') && !size){
    //         fetch('http://localhost:5000/addtocart',{
    //             method:'POST',
    //             headers:{
    //                 'Content-Type':'application/json',
    //                 'auth-token':`${localStorage.getItem('auth-token')}`
    //             },
    //             body:JSON.stringify({id:item,size:size})
    //         }).then((res)=>res.json()).then((data)=>console.log(data))
    //         console.log('from call')
            
    //     }
        
    // }
    const removefromcart=(item)=>{
        setCartItems((prev)=>({...prev,[item]:prev[item]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:5000/removefromcart',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`
                },
                body:JSON.stringify({id:item})
            }).then((res)=>res.json()).then((data)=>console.log(data))

        }
    }
    const gettotal=()=>{
        let total=0
        for (const item in cartItems ){
            if(cartItems[item]>0){
                let iteminfo=all_product.find((product)=>product.id===Number(item))
                total+=cartItems[item]*iteminfo.new_price;
                return total
            }
            
            
        }
    }


    const gettotalcartitems=()=>{
        let total=0
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                total=total+cartItems[item]
                
            }
        }
            return total;
        
    }
    const contextvalue={gettotal,gettotalcartitems,all_product,cartItems,removefromcart,addtocart}
    return(
        <ShopContext.Provider value={contextvalue}>
            {props.children}    
        </ShopContext.Provider>
    )
}
export default ShopContextProvider