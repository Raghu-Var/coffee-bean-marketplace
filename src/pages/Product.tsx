import React, { useState } from 'react';
import CoffeeTypeSelector from '../components/CoffeeTypeSelector';
import RegionSelector from '../components/RegionSelector';
import EstateSelector from '../components/EstateSelector';
import VendorSelector from '../components/VendorSelector';
import QuantitySelector from '../components/QuantitySelector';
import GrindSizeSelector from '../components/GrindSizeSelector';

const Product = () => {
    const [coffeeType, setCoffeeType] = useState('');
    const [region, setRegion] = useState('');
    const [estate, setEstate] = useState('');
    const [vendor, setVendor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [grindSize, setGrindSize] = useState('');

    return (
        <div>
            <h1>Product Details</h1>
            <CoffeeTypeSelector selectedType={coffeeType} onSelectType={setCoffeeType} />
            <RegionSelector selectedRegion={region} onSelectRegion={setRegion} />
            <EstateSelector selectedEstate={estate} onSelectEstate={setEstate} region={region} />
            <VendorSelector selectedVendor={vendor} onSelectVendor={setVendor} estate={estate} />
            <QuantitySelector selectedQuantity={quantity} onSelectQuantity={setQuantity} />
            <GrindSizeSelector selectedGrindSize={grindSize} onSelectGrindSize={setGrindSize} />
            <button>Add to Cart</button>
        </div>
    );
};

export default Product;