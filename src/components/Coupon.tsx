import React, { useState } from 'react';

const Coupon: React.FC = () => {
    const [couponCode, setCouponCode] = useState('');
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const validateCoupon = () => {
        // Example validation logic
        const validCoupons = ['COFFEE10', 'BEAN20'];
        setIsValid(validCoupons.includes(couponCode));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCouponCode(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        validateCoupon();
    };

    return (
        <div>
            <h2>Apply Coupon</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={couponCode}
                    onChange={handleInputChange}
                    placeholder="Enter coupon code"
                />
                <button type="submit">Apply</button>
            </form>
            {isValid !== null && (
                <p>{isValid ? 'Coupon applied successfully!' : 'Invalid coupon code.'}</p>
            )}
        </div>
    );
};

export default Coupon;