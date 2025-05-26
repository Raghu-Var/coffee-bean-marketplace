import React from 'react';
import CoffeeTypeSelector from '../components/CoffeeTypeSelector';
import RegionSelector from '../components/RegionSelector';
import EstateSelector from '../components/EstateSelector';
import VendorSelector from '../components/VendorSelector';
import QuantitySelector from '../components/QuantitySelector';
import GrindSizeSelector from '../components/GrindSizeSelector';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Coffee Bean Marketplace</h1>
            <p>Select your favorite coffee beans from various options.</p>
            <CoffeeTypeSelector />
            <RegionSelector />
            <EstateSelector />
            <VendorSelector />
            <QuantitySelector />
            <GrindSizeSelector />
        </div>
    );
};

export default Home;