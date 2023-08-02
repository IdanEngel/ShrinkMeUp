import React, { ReactNode } from "react";
import "./Background.less"; 

interface BackgroundComponentProps {
  children: ReactNode;
}
/**
 *  This component is created for the nice animated background
 */
const BackgroundComponent: React.FC<BackgroundComponentProps> = ({ children }) => {
  return (
    <div className="background-container">
      <div className="wrapper">
        <ul className="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        {children}
      </div>
    </div>
  );
};

export default BackgroundComponent;
