import React, { useState } from 'react';

const Checkout: React.FC = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
    });
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Process the order here
        console.log('Order submitted:', { userInfo, paymentInfo });
    };

    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <h3>User Information</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={userInfo.address}
                    onChange={handleUserInfoChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={userInfo.city}
                    onChange={handleUserInfoChange}
                    required
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={userInfo.postalCode}
                    onChange={handleUserInfoChange}
                    required
                />
                
                <h3>Payment Information</h3>
                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentInfoChange}
                    required
                />
                <input
                    type="text"
                    name="expiryDate"
                    placeholder="Expiry Date (MM/YY)"
                    value={paymentInfo.expiryDate}
                    onChange={handlePaymentInfoChange}
                    required
                />
                <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentInfoChange}
                    required
                />
                
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;