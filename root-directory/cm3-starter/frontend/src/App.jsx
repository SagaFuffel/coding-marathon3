import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useState } from "react";

import Home from "./pages/HomePage";
import AddVehicleRentalPage from "./pages/AddVehicleRentalPage";
import VehicleRentalPage from "./pages/VehicleRentalPage";
import EditVehicleRentalPage from "./pages/EditVehicleRentalPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? true : false;
  });

return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/vehicle-rental/:id"
              element={<VehicleRentalPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/add-vehicle-rental"
              element={
                isAuthenticated ? <AddVehicleRentalPage /> : <Navigate to="/signup" />
              }
            />
            <Route
              path="/edit-vehicle-rental/:id"
              element={
                isAuthenticated ? (
                  <EditVehicleRentalPage />
                ) : (
                  <Navigate to="/signup" />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <SignUp setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <LogIn setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;