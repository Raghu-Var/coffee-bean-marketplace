import React, { useState } from 'react';

const Tracking: React.FC = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState<string | null>(null);

    const handleTrackingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate an API call to fetch order status
        // In a real application, you would replace this with an actual API request
        const simulatedOrderStatus = 'Your order is on the way!'; // Placeholder response
        setOrderStatus(simulatedOrderStatus);
    };

    return (
        <div>
            <h2>Track Your Order</h2>
            <form onSubmit={handleTrackingSubmit}>
                <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter your tracking number"
                    required
                />
                <button type="submit">Track</button>
            </form>
            {orderStatus && <p>{orderStatus}</p>}
        </div>
    );
};

export default Tracking;