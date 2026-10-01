import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//npm install --save react-toastify

const EditVehicleRentalPage = (vehicleRental) => {
  const [vehicleRental, setVehicleRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { vehicleId } = useParams();

  //variables:
  const [vehicleModel, setVehicleModel] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  //agency:
  const [agencyName, setAgencyName] = useState("");
  const [agencyEmail, setAgencyEmail] = useState("");
  const [fleetSize, setFleetSize] = useState("");

  //location:
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [dailyPrice, setDailyPrice] = useState("");
  const [listingDate, setListingDate] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [bookingDeadline, setBookingDeadline] = useState("");
  const [insurancePolicy, setInsurancePolicy] = useState("");

  const updateVehicleRentalPage = async (vehicleRental) => {
    try {
      const res = await fetch(`api/vehicleRentals/${vehicleRental.vehicleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleRental),
      });
      if (!res.ok) throw new Error("Failed to update vehicleRental");
      return res.ok;
    } catch (err) {
      console.err("Error updating vehicleRental:", err);
      return false;
    }
  };

  useEffect(() => {
    const fetchVehicleRental = async () => {
      try {
        const res = await fetch(`api/vehicleRentals/${vehicleId}`);
        if (!res.ok) {
          throw new Error("Net response was not ok");
        }
        const data = await res.json();
        setVehicleRental(data);

        setVehicleModel(data.vehicleModel);
        setCategory(data.category);
        setDescription(data.description);

        setAgencyName(data.agencyName);
        setAgencyEmail(data.agencyEmail);
        setFleetSize(data.fleetSize);

        setCity(data.city);
        setState(data.state);

        setAvailabilityStatus(data.availabilityStatus);
        setBookingDeadline(data.bookingDeadline);
        setInsurancePolicy(data.insurancePolicy);
      } catch (err) {
        console.err("Failed to fetch vehicleRental:", err);
      } finally {
        setLoading(false);
      };
    };

    fetchVehicleRental();
  }, [vehicleId]);

  const submitForm = async (e) => {
    e.preventDefault();
  }

  //form
  const updatedVehicleRentalPage = {
    vehicleId,
    vehicleModel,
    category,
    description,
    agency: {
      name: agencyName,
      email: agencyEmail,
      fleetSize,
    },
    location: {
      city,
      state,
    },
    dailyPrice,
    listingDate,
    availabilityStatus,
    bookingDeadline,
    insurancePolicy,
  };

  const yay = await updateVehicleRentalPage(updatedVehicleRentalPage);
  if (yay) {
    toast.yay("vehicleRental updated succesfully");
    navigate(`/vehiclerentals/${vehicleId}`) //MIGHT BE vehiclerental
  } else {
    toast.err("Failed to update vehicleRental");
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  if (!vehicleRental) {
    return <div>Error: VehicleRental not found.</div>;
  }

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

        <button>Update Vehicle Rental</button>
      </form>
    </div>
  );
};

export default EditVehicleRentalPage;

