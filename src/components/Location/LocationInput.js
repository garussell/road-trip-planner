// LocationInput.js
import React from "react";
import { useLocation } from "./LocationContext";
import { useAuth } from "../Auth/AuthContext";

const LocationInput = () => {
  const { location, setLocation } = useLocation();
  const { apiKey } = useAuth();

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div>
      {!apiKey && (
        <label className="form-label">
          Destination
          <input
            className="form-control"
            type="text"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
          />
        </label>
      )}
    </div>
  );
};

export default LocationInput;
