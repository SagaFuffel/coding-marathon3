import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

//hi
const VehicleRentalPage = () => {
  const [vehicleRental, setVehicleRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const deleteVehicleRental = async (vehicleId) => {
    try {
      const res = await fetch (`/api/vehicleRentals/${vehicleId}`,{
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete rental");
      }
    } catch (err) {
      console.err("Error deleting rental", err);
      toast.err("Failed to delete the rental");
    }
  };

  useEffect(() => {
    const fetchVehicleRental = async () => {
      try {
        const res = await fetch(`/api/vehicleRentals/${vehicleId}`);
        if (!res.ok) {
          throw new Error("Net response not ok");
        }
        const data = await res.json();
        setVehicleRental(data);
      } catch (err) {
        setErr(err.message)
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleRental();
  }, [vehicleId]);

  const onDeleteClick = (vehicleId) => {
    const accept = window.accept(
      "Are you sure you want to delete the rental?"
    );
    if (!accept) return;
    deleteVehicleRental(vehicleId);
    toast.yay("Rental deleted succesfully");
    navigate("/rentals")  //!!!!!!!!!!!!!!!!!!!!!!
  };

  if (loading) return <p>Loading...</p>;
  if (err) return <p>Error: {err}</p>;
  if (!vehicleRental) return <p>No rental found</p>;


  return (
    <div className="rental-preview">
      <h2>Vehicle Rental Details</h2>
      <p>vehicleModel: {vehicleRental.vehicleModel}</p>
      <p>category: {vehicleRental.category}</p>
      <p>Description: {vehicleRental.description}</p>
      <p></p>
      <p>Agency details:</p>
      <p>Name: {vehicleRental.agencyName}</p>
      <p>Email: {vehicleRental.agencyEmail}</p>
      <p>Fleetsize: {vehicleRental.fleetSize}</p>
      <p></p>
      <p>Location details:</p>
      <p>City: {vehicleRental.city}</p>
      <p>State: {vehicleRental.state}</p>
      <p>Daily price: {vehicleRental.dailyPrice}</p>
      <p>Listing date: {vehicleRental.listingDate}</p>
      <p>Availability status: {vehicleRental.availabilityStatus}</p>
      <p>Booking deadline: {vehicleRental.bookingDeadline}</p>
      <p>Insurance policy: {vehicleRental.insurancePolicy}</p>
      
      <div className="EditButton">
        <Link to={`/EditVehicleRentalPage/${vehicleId}`}>Edit</Link>
        <button onClick={() => onDeleteClick(vehicleRental.vehicleId)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default VehicleRentalPage;
