// App.tsx

import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import TopNavbar from "./NavbarComponent/TopNavbar";
import Home from "./Home/Home";
import LinkTable from "./LinksTableComponent/LinkTable";

// Main component that wraps the entire used app
const App: React.FC = () => {
  return (
    <>
      <Router>
        <div>
          <TopNavbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-links" element={<LinkTable />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
