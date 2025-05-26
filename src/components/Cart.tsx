import React from 'react';
import { useCart } from '../hooks/useCart';

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <span>{item.name}</span>
                            <span>Quantity: 
                                <input 
                                    type="number" 
                                    value={item.quantity} 
                                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))} 
                                />
                            </span>
                            <span>Price: ${item.price}</span>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Total Price: ${totalPrice}</h3>
        </div>
    );
};

export default Cart;