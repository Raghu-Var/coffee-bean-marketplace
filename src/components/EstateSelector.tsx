import React, { useEffect, useState } from 'react';

interface EstateSelectorProps {
  selectedRegion: string;
  onEstateSelect: (estate: string) => void;
}

const EstateSelector: React.FC<EstateSelectorProps> = ({ selectedRegion, onEstateSelect }) => {
  const [estates, setEstates] = useState<string[]>([]);
  const [selectedEstate, setSelectedEstate] = useState<string>('');

  useEffect(() => {
    if (selectedRegion) {
      // Fetch estates based on the selected region
      fetch(`/api/estates?region=${selectedRegion}`)
        .then(response => response.json())
        .then(data => setEstates(data))
        .catch(error => console.error('Error fetching estates:', error));
    }
  }, [selectedRegion]);

  const handleEstateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const estate = event.target.value;
    setSelectedEstate(estate);
    onEstateSelect(estate);
  };

  return (
    <div>
      <label htmlFor="estate-selector">Select Estate:</label>
      <select id="estate-selector" value={selectedEstate} onChange={handleEstateChange}>
        <option value="">--Select an Estate--</option>
        {estates.map((estate) => (
          <option key={estate} value={estate}>
            {estate}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EstateSelector;