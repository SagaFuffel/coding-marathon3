import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditVehicleRentalPage = () => {
  const [vehicleRental, setVehicleRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

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

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  useEffect(() => {
    const fetchVehicleRental = async () => {
      try {
        const res = await fetch(`/api/vehiclerentals/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setVehicleRental(data);

        setVehicleModel(data.vehicleModel);
        setCategory(data.category);
        setDescription(data.description);

        setAgencyName(data.agency.name);
        setAgencyEmail(data.agency.contactEmail);
        setFleetSize(data.agency.fleetSize || 0);

        setCity(data.location.city);
        setState(data.location.state);

        setDailyPrice(data.dailyPrice);
        setAvailabilityStatus(data.availabilityStatus);
        setInsurancePolicy(data.insurancePolicy);

        if (data.bookingDeadline) {
          setBookingDeadline(data.bookingDeadline.slice(0, 10));
        }
      } catch (error) {
        console.error("Failed to fetch vehicleRental:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleRental();
  }, [id]);

  const updateVehicleRental = async (updatedVehicleRental) => {
    try {
      const res = await fetch(`/api/vehicleRentals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(updatedVehicleRental),
      });
      if (!res.ok) {
        throw new Error("Failed to update vehicleRental");
      }
      return true;
    } catch (error) {
      console.error("Error updating vehicleRental:", error);
      return false;
    }
  };

  


  const submitForm = async (e) => {
    e.preventDefault();

    const updatedVehicleRental = {
      vehicleModel: vehicleModel,
      category: category,
      description: description,
      agency: {
        name: agencyName,
        contactEmail: agencyEmail,
        fleetSize: Number(fleetSize),
      },
      location: {
        city: city,
        state: state,
      },
      dailyPrice: Number(dailyPrice),
      availabilityStatus: availabilityStatus,
      bookingDeadline: bookingDeadline,
      insurancePolicy: insurancePolicy,
    };

    const success = await updateVehicleRental(updatedVehicleRental);

    if (success) {
      toast.success("Vehicle rental updated successfully");
      navigate(`/`);
    } else {
      toast.error("Failed to update vehicle rental");
    }
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  if (!vehicleRental) {
    return <div>Error: VehicleRental not found.</div>;
  }

  return (
    <div className="create">
      <h2>Edit Vehicle Rental</h2>
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