import React, { useContext, useMemo } from 'react';
import CartContext from '../../Store/CartContext';

function Cart() {
  const cartCtx = useContext(CartContext);
  const products = cartCtx.cart;
  const totalPrice = products.reduce((obj, item) => {
    const updatedTotalPrice = parseInt(obj.totalPrice) + (parseInt(item.price) * item.quantity);
    const updatedTotalQuantity = parseInt(obj.totalQuantity) + parseInt(item.quantity);
    
    return {
        totalPrice: updatedTotalPrice,
        quantity: updatedTotalQuantity
    };
}, { totalPrice: 0, quantity: 0 });

const length = useMemo(()=>{
  cartCtx.addLength(totalPrice.quantity)
},[totalPrice.quantity])


  return (
    <>
      {products.length === 0 ? (
        <h2>No items in the cart</h2>
      ) : (
        products.map((item) => (
          <div className="product" key={item.id}>
            <h1>{item.title}</h1>
            <img src={item.imageUrl} alt={item.title} />
            <p>Price: ${item.price}. Quantity: {item.quantity}</p>
            <button onClick={() => cartCtx.removeFromCart(item.id)}>-</button>
            <button onClick={() => cartCtx.addToCart(item)}>+</button>
          </div>
        ))
      )}
      <hr/>
      <div>Total price: ${totalPrice.totalPrice}</div>
    </>
  );
}

export default Cart;
