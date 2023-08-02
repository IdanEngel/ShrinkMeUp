// LoadingScreen.tsx
import React from 'react';
import spinner from '../assets/LoadingSpinner.gif'
import '../LinksTableComponent/LinkTable.css'

// Loading Screen Component
const LoadingScreen: React.FC = () => {
  // Displays spinner
  return (
    <div className="loading-spinner">
      <img src={spinner} alt="Loading..." />
    </div>
  );
};

export default LoadingScreen;
