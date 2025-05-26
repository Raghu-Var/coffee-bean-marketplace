import React, { useState } from 'react';

const OrderTracking: React.FC = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState<string | null>(null);

    const handleTrackingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate an API call to fetch order status
        // In a real application, you would replace this with an actual API request
        const mockOrderStatus = 'Your order is on the way!'; // Mock response
        setOrderStatus(mockOrderStatus);
    };

    return (
        <div>
            <h1>Order Tracking</h1>
            <form onSubmit={handleTrackingSubmit}>
                <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter your tracking number"
                    required
                />
                <button type="submit">Track Order</button>
            </form>
            {orderStatus && <p>{orderStatus}</p>}
        </div>
    );
};

export default OrderTracking;