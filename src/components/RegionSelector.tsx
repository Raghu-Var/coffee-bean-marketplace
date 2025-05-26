import React, { useEffect, useState } from 'react';

const RegionSelector = ({ selectedRegion, onRegionChange }) => {
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        const fetchRegions = async () => {
            // Simulate fetching regions from an API
            const response = await fetch('/api/regions');
            const data = await response.json();
            setRegions(data);
        };

        fetchRegions();
    }, []);

    const handleChange = (event) => {
        onRegionChange(event.target.value);
    };

    return (
        <div>
            <label htmlFor="region-selector">Select Coffee Growing Region:</label>
            <select id="region-selector" value={selectedRegion} onChange={handleChange}>
                <option value="">--Select a Region--</option>
                {regions.map((region) => (
                    <option key={region.id} value={region.name}>
                        {region.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RegionSelector;