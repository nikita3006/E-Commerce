import React, {useState} from 'react'
import CartContext from './CartContext'

function CartProvider({children}) {
    const [cart, setCart] = useState([])
    const [length, setLength] = useState(0)
    //useffect (get req )
// taki cart empty na ho refresh krne m
    // Add item to cart
    function addToCart(newItem) {
        console.log(newItem)
        const existingItemIndex = cart.findIndex(item => item.id == newItem.id )
        const existingItem = cart[existingItemIndex]
        let updatedCart ; 
        if (existingItem && existingItemIndex !== -1) { //put (id)
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1 ,
            }
            updatedCart = [...cart]
            updatedCart[existingItemIndex] = updatedItem
            setCart(updatedCart)
        }
        else{ //post
            const product = { ...newItem, quantity : 1} //initialzing from 1 
            setCart([...cart, product])
        }
    } 
    console.log(cart)
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