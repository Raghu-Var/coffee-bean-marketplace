import React, { useState } from 'react';

const QuantitySelector: React.FC<{ onQuantityChange: (quantity: number) => void }> = ({ onQuantityChange }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    return (
        <div>
            <label htmlFor="quantity">Select Quantity:</label>
            <select id="quantity" value={quantity} onChange={handleQuantityChange}>
                {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                        {num + 1}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default QuantitySelector;