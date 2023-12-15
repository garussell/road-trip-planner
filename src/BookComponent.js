// BookComponent.js
import React, { useEffect } from "react";
import { useLocation } from "./LocationContext";

const BookComponent = () => {
  const { location } = useLocation();

  useEffect(() => {
    console.log("Location in BookComponent", location);
  }, [location]);

  return (
    <div className="container mt-4 mb-4">
      {/* Book display code here */}
      <h2>Book Display</h2>
      
    </div>
  );
};

export default BookComponent;
