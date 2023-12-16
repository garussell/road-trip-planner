// LocationInput.js
import React from "react";
import { useLocation } from "./LocationContext";

const LocationInput = () => {
  const { location, setLocation } = useLocation();

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <label className="form-label">
      Destination
      <input
        className="form-control"
        type="text"
        value={location}
        onChange={(e) => handleLocationChange(e.target.value)}
      />
    </label>
  );
};

export default LocationInput;
