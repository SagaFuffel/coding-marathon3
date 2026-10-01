import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddVehicleRentalPage = () => {
  const [vehicleModel, setVehicleModel] = useState("");
  const [category, setCategory] = useState("Economy");
  const [description, setDescription] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [agencyEmail, setAgencyEmail] = useState("");
  const [fleetSize, setFleetSize] = useState(0);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [dailyPrice, setDailyPrice] = useState(0);
  const [availabilityStatus, setAvailabilityStatus] = useState("available");
  const [bookingDeadline, setBookingDeadline] = useState("");
  const [insurancePolicy, setInsurancePolicy] = useState("");

  const navigate = useNavigate();
  const addVehicleRental = async (newVehicleRental) => {
    try {
      const res = await fetch("/api/vehicleRentals", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newVehicleRental),
      });
      if (!res.ok) {
        throw new Error("Failed to add vehicle rental");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    let deadline = null;
    if (bookingDeadline) {
      deadline = new Date(bookingDeadline);
    }
    const newVehicleRental = {
      vehicleModel: vehicleModel,
      category: category,
      description: description,
      agency: {
        name: agencyName,
        contactEmail: agencyEmail,
        fleetSize: Number(fleetSize),},
      location: {
          city: city,
          state: state,
        },
      
      dailyPrice: Number(dailyPrice),
      availabilityStatus: availabilityStatus,
      bookingDeadline: deadline,
      insurancePolicy: insurancePolicy,
    };
    const success = await addVehicleRental(newVehicleRental);
    if (success) {
      toast.success("Vehicle rental added successfully");
      navigate("/"); //
    } else {
      toast.error("Failed to add vehicle rental");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Vehicle Rental</h2>
      <form onSubmit={submitForm}>
        <label>Vehicle Model:</label>
        <input
          type="text"
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
          required
        />

        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Economy">Economy</option>
          <option value="Luxury">Luxury</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
          <option value="Truck">Truck</option>
        </select>

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label>Agency Name:</label>
        <input
          type="text"
          value={agencyName}
          onChange={(e) => setAgencyName(e.target.value)}
          required
        />

        <label>Agency Email:</label>
        <input
          type="email"
          value={agencyEmail}
          onChange={(e) => setAgencyEmail(e.target.value)}
          required
        />

        <label>Fleet Size:</label>
        <input
          type="number"
          value={fleetSize}
          onChange={(e) => setFleetSize(e.target.value)}
          min="0"
          required
        />

        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />

        <label>Daily Price:</label>
        <input
          type="number"
          value={dailyPrice}
          onChange={(e) => setDailyPrice(e.target.value)}
          step="0.01"
          min="0"
          required
        />

        <label>Availability Status:</label>
        <select
          value={availabilityStatus}
          onChange={(e) => setAvailabilityStatus(e.target.value)}
        >
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <label>Booking Deadline:</label>
        <input
          type="date"
          value={bookingDeadline}
          onChange={(e) => setBookingDeadline(e.target.value)}
          required
        />

        <label>Insurance Policy:</label>
        <input
          type="text"
          value={insurancePolicy}
          onChange={(e) => setInsurancePolicy(e.target.value)}
          required
        />

        <button>Add Vehicle Rental</button>
      </form>
    </div>
  );
};

export default AddVehicleRentalPage;
