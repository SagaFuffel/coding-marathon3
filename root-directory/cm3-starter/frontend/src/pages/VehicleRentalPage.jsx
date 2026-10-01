import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const VehicleRentalPage = ({isAuthenticated}) => {
  const [vehicleRental, setVehicleRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const user = JSO.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const deleteVehicleRental = async (id) => {
    try {
      const res = await fetch(`/api/vehicleRentals/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (!res.ok) {
        throw new Error("Failed to delete rental");
      }
      return true;
    } catch (error) {
      console.error("Error deleting rental", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchVehicleRental = async () => {
      try {
        const res = await fetch(`/api/vehicleRentals/${vehicleId}`);
        if (!res.ok) {
          throw new Error("Network response not ok");
        }
        const data = await res.json();
        setVehicleRental(data);
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleRental();
  }, [vehicleId]);

  const onDeleteClick = async (id) => {
    const accept = window.confirm("Are you sure you want to delete the rental?");
    if (!accept) {
      return;
    }

    const success = await deleteVehicleRental(id);

    if (success) {
      toast.success("Rental deleted successfully");
      navigate("/");
    } else {
      toast.error("Failed to delete the rental");
    }
  };

  const formatDate = (value) => {
    if (!value) {
      return "";
    }
    return value.slice(0, 10);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (err) {
    return <p>Error: {err}</p>;
  }
  if (!vehicleRental) {
    return <p>No rental found</p>;
  }

  return (
    <div className="rental-preview">
      <h2>Vehicle Rental Details</h2>
      <p>Vehicle model: {vehicleRental.vehicleModel}</p>
      <p>Category: {vehicleRental.category}</p>
      <p>Description: {vehicleRental.description}</p>

      <p>Agency details:</p>
      <p>Name: {vehicleRental.agency.name}</p>
      <p>Email: {vehicleRental.agency.contactEmail}</p>
      <p>Fleet size: {vehicleRental.agency.fleetSize}</p>

      <p>Location details:</p>
      <p>City: {vehicleRental.location.city}</p>
      <p>State: {vehicleRental.location.state}</p>

      <p>Daily price: {vehicleRental.dailyPrice}</p>
      <p>Listing date: {formatDate(vehicleRental.listingDate)}</p>
      <p>Availability status: {vehicleRental.availabilityStatus}</p>
      <p>Booking deadline: {formatDate(vehicleRental.bookingDeadline)}</p>
      <p>Insurance policy: {vehicleRental.insurancePolicy}</p>

      {isAuthenticated && (
        <div className="EditButton">
        <Link to={`/edit-rental/${vehicleId}`}>Edit</Link>
        <button onClick={() => onDeleteClick(vehicleRental.id)}>Delete</button>
        </div>
      )};
      
    </div>
  );
};

export default VehicleRentalPage;