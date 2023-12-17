// Navbar.js
import React from 'react';
import AuthForm from '../Auth/AuthForm';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button className="navbar-brand btn btn-link" type="button">
          Road Trip Planner
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Other navbar content */}
          <AuthForm />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
