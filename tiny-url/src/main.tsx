import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import BackgroundComponent from "./BackgroundComponent/Background.tsx";
import "./index.css";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BackgroundComponent >
      <App />
    </BackgroundComponent>
  </React.StrictMode>
);
