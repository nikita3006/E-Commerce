import React, { useState, useEffect } from 'react';

import CartContext from './CartContext';

async function fetchData(setCart) {
    try {
        const response = await fetch('https://e-commerce-eeb2e-default-rtdb.firebaseio.com/cart');
        const data = await response.json();
        setCart(data); // Assuming the response is an array of items
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function updateCart(updatedCart) {
    try {
        await fetch('https://e-commerce-eeb2e-default-rtdb.firebaseio.com/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCart),
        });
        // Handle successful update if needed
    } catch (error) {
        console.error('Error updating cart:', error);
    }
}

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [length, setLength] = useState(0);

    useEffect(() => {
        // Fetch data from the API (GET request) when the component mounts
        fetchData(setCart);
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    // Add item to cart
    async function addToCart(newItem) {
        const existingItemIndex = cart.findIndex(item => item.id === newItem.id);
        const existingItem = cart[existingItemIndex];
        let updatedCart;

        if (existingItem && existingItemIndex !== -1) {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedCart = [...cart];
            updatedCart[existingItemIndex] = updatedItem;
            setCart(updatedCart);
        } else {
            const product = { ...newItem, quantity: 1 };
            setCart([...cart, product]);
        }

        // Update the API (PUT request) with the updated cart
        await updateCart(updatedCart);
    }

    // Remove item from cart
    async function removeFromCart(id) {
        const existingItemIndex = cart.findIndex(item => item.id === id);
        const existingItem = cart[existingItemIndex];
        let updatedCart;

        if (existingItem.quantity === 1) {
            alert("This is the last one in your cart!");
            setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1,
            };
            updatedCart = [...cart];
            updatedCart[existingItemIndex] = updatedItem;
            setCart(updatedCart);
        }

        // Update the API (PUT request) with the updated cart
        await updateCart(updatedCart);
    }

    const addLength = (l) => {
        setLength(l);
    }

    const obj = {
        cart, addToCart, removeFromCart,
        addLength, length
    };

    return (
        <CartContext.Provider value={obj}>{children}</CartContext.Provider>
    );
}

export default CartProvider;
