import {React, createContext, useEffect} from "react";
import { useState } from "react";
export const ShopContext=createContext(null);

    // const getdefaultcart=()=>{
    //     let cart={}
    //     for(let item=0;item<300+1;item++){
    //         cart[item]=0
    //     }
    //     return cart
    // }
const ShopContextProvider=(props)=>{
    const[num,Setnum]=useState(0)
    const [all_product,Setall_product]=useState([])
    const [orders,Setorders]=useState([])
    const [discount,Setdiscount]=useState('')
    const [res,Setres]=useState('')
    const [cartupdated,setCartupdated]=useState(false)
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
            }).then((res)=>res.json()).then((data)=>Setnum(data.count))
            let call=async()=>{
                await fetch('http://localhost:5000/getorders'
                ,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':`${localStorage.getItem('auth-token')}`
                    },
                    body:""
                }
            ).then((res)=>res.json()).then((data)=>Setorders(data))
              }
              call();
        }
    },[cartupdated])

    useEffect(()=>{
        console.log(discount)
    },[discount])

    // const [cartItems,setCartItems]=useState(getdefaultcart())
    
    const addtocart=(item,size)=>{
        // setCartItems((prev)=>({...prev,[item]:prev[item]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:5000/addtocart',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`
                },
                body:JSON.stringify({id:item,size:size})
            }).then((res)=>res.json()).then((data)=>{console.log(data);
            setCartupdated(prev=>!prev)
            })

        }
    }
    const removefromcart=(item,size)=>{
        
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:5000/removefromcart',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`
                },
                body:JSON.stringify({id:item,size:size})
            }).then((res)=>res.json()).then((data)=>{
                    console.log(data);
                    setCartupdated(prev=> !prev)
            })
        }
    }
    
    
    
        const applypromo=(promo)=>{
            const promoData= {promo:promo}
            fetch('http://localhost:5000/applypromo',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(promoData)
            }).then((res)=>res.json()).then((data)=>{Setdiscount(data.discount)
            Setres(data.success)
            })
            
        }
        const gettotal=()=>{
            let total=0
            for (const order in orders ){
                total += orders[order].price * orders[order].quantity
                }
                if (discount)
                    total=total-(total*(discount/100))
            return total;
            }

    const gettotalcartitems=()=>{

             return num;
        
    }

    

    const contextvalue={orders,gettotalcartitems,res,discount,applypromo,gettotal,removefromcart,all_product,addtocart}
    return(
        <ShopContext.Provider value={contextvalue}>
            {props.children}    
        </ShopContext.Provider>
    )
}
export default ShopContextProvider