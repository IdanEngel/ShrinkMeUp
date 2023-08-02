// TopNavbar.tsx
import React from "react";
import { Link } from "react-router-dom";

import "./TopNavbar.css"; // Import the CSS file for styling

// Navbar Component linking to routes
const TopNavbar: React.FC = () => {
  return (
    <nav className="top-navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/all-links">All Links</Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavbar;
