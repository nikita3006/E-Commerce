import { createContext } from "react";

const CartContext = createContext({
    cart: [],
    addToCart: (item) => {},
    removeFromCart: (id) => {},
    length : null,
    addLength :(item) => {},
})



export  default CartContext;