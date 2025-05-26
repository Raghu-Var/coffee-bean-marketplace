import React, { useState } from 'react';

const grindSizes = [
  { value: 'coarse', label: 'Coarse (French Press)' },
  { value: 'medium', label: 'Medium (Drip Coffee)' },
  { value: 'fine', label: 'Fine (Espresso)' },
  { value: 'extra-fine', label: 'Extra Fine (Turkish Coffee)' },
];

const GrindSizeSelector = ({ onGrindSizeChange }) => {
  const [selectedGrindSize, setSelectedGrindSize] = useState(grindSizes[0].value);

  const handleChange = (event) => {
    const newGrindSize = event.target.value;
    setSelectedGrindSize(newGrindSize);
    onGrindSizeChange(newGrindSize);
  };

  return (
    <div>
      <label htmlFor="grind-size">Select Grind Size:</label>
      <select id="grind-size" value={selectedGrindSize} onChange={handleChange}>
        {grindSizes.map((grind) => (
          <option key={grind.value} value={grind.value}>
            {grind.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GrindSizeSelector;