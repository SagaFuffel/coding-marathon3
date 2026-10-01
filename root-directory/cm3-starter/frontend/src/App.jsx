import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/HomePage";
import AddVehicleRentalPage from "./pages/AddVehicleRentalPage";
import VehicleRentalPage from "./pages/VehicleRentalPage";
import EditVehicleRentalPage from "./pages/EditVehicleRentalPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-rental" element={<AddVehicleRentalPage />} />
            <Route path="/vehiclerentals/:vehicleId" element={<VehicleRentalPage />} />
            <Route path="/edit-rental/:vehicleId" element={<EditVehicleRentalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;