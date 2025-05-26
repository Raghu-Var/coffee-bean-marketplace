import React, { useEffect, useState } from 'react';
import { Vendor } from '../types';

interface VendorSelectorProps {
  selectedEstate: string;
  onVendorSelect: (vendor: Vendor) => void;
}

const VendorSelector: React.FC<VendorSelectorProps> = ({ selectedEstate, onVendorSelect }) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      if (selectedEstate) {
        const response = await fetch(`/api/vendors?estate=${selectedEstate}`);
        const data = await response.json();
        setVendors(data);
      }
    };

    fetchVendors();
  }, [selectedEstate]);

  const handleVendorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const vendorId = event.target.value;
    const vendor = vendors.find(v => v.id === vendorId) || null;
    setSelectedVendor(vendor);
    onVendorSelect(vendor);
  };

  return (
    <div>
      <label htmlFor="vendor-select">Select Vendor:</label>
      <select id="vendor-select" onChange={handleVendorChange} value={selectedVendor?.id || ''}>
        <option value="">--Select a Vendor--</option>
        {vendors.map(vendor => (
          <option key={vendor.id} value={vendor.id}>
            {vendor.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VendorSelector;