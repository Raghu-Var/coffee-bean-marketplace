import React, { useState } from 'react';

const CoffeeTypeSelector: React.FC = () => {
    const [selectedCoffeeType, setSelectedCoffeeType] = useState<string>('Arabica');

    const coffeeTypes = ['Arabica', 'Robusta', 'Liberica', 'Excelsa'];

    const handleCoffeeTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCoffeeType(event.target.value);
    };

    return (
        <div>
            <label htmlFor="coffee-type">Select Coffee Type:</label>
            <select id="coffee-type" value={selectedCoffeeType} onChange={handleCoffeeTypeChange}>
                {coffeeTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CoffeeTypeSelector;