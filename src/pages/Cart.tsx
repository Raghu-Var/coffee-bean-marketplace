import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import { CartItem } from '../types';

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const cartItems: CartItem[] = useSelector((state: any) => state.cart.items);

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item.id}>
                            <h2>{item.name}</h2>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                min="1"
                            />
                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                        </div>
                    ))}
                    <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                </div>
            )}
        </div>
    );
};

export default Cart;