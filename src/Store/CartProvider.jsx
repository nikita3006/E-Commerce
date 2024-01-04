import React, {useContext, useState} from 'react'
import CartContext from './CartContext'
import AuthContext from './AuthContext'

function CartProvider({children}) {
    const [cart, setCart] = useState([])
    const [length, setLength] = useState(0)
    const authCtx =  useContext(AuthContext)
    // const email = localStorage.getItem("email")
const userEmail = localStorage.getItem("email")
console.log(userEmail, "jello")
    //we can not gave @gmail.com to firebase that's why we just gave username to firebase
    let userName =userEmail && userEmail.split('@')[0]

    const url = `https://e-commerce-eeb2e-default-rtdb.firebaseio.com/${userName}`


    async function addToCart(newItem) {
        // console.log(newItem)
        const existingItemIndex = cart.findIndex(item => item.id == newItem.id )
        const existingItem = cart[existingItemIndex]
        let updatedCart ; 
        if (existingItem && existingItemIndex !== -1) { //put (id)
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1 ,
            }
            console.log(updatedItem, "item")
            updatedCart = [...cart] //gold silver
            updatedCart[existingItemIndex] = updatedItem //qauntity increased
          
            const response = await fetch (`${url}/${existingItem.id}.json`,{
                method:'PUT',
                body:JSON.stringify(updatedItem), //sab wesa rahega bas quantity badh jayega
                headers:{
                    "Content-Type":"application/json"
                }
            })
            setCart(updatedCart)
        }
        else{ //post
            const product = { ...newItem, quantity : 1} // quantity initialzing from 1 
            // setCart([...cart, product])

            const response = await fetch(`${url}.json`, {
                method:'POST',
                body:JSON.stringify(product),
                headers:{
                    "Content-Type":"application/json"
                }
                
            })
            const data=  await response.json()
            console.log(data)
            const updatedItem={...product, id:data.name} //by using data.id..it will replace firebase id instead of product id which we are giving
            updatedCart=[...cart, updatedItem] // id and quantity pushing
            setCart(updatedCart)

          
        }
    } 
   
    function removeFromCart(id){
        const existingItemIndex = cart.findIndex(item => item.id == id )
        const existingItem = cart[existingItemIndex]
        let updatedCart ;
      if(existingItem.quantity === 1){ //delete
        alert("This is the last one in your cart!")
        return setCart((prevCart)=> prevCart.filter((item)=>(item.id != id)))
      }
      else{ //put (id - )
        const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity - 1 ,
        }
        updatedCart = [...cart]
        updatedCart[existingItemIndex] = updatedItem
        setCart(updatedCart)
      }
    }

   const addLength = (l) => {
    setLength(l)
   }

     const obj = {
        cart, addToCart, removeFromCart,
        addLength,length
     }       
  return (

    <CartContext.Provider value = {obj}>{children}</CartContext.Provider>
  )
}

export default CartProvider