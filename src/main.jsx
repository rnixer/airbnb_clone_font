import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./feature/auth/contexts/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import PlaceContextProvider from "./contexts/PlaceContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <PlaceContextProvider>
      <App />
    </PlaceContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
