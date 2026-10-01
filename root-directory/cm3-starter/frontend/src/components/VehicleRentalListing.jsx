import { Link } from "react-router-dom";

const VehicleRentalListing = ({ vehicle }) => {
  return (
    <div className="rental-preview">
      <Link to={`/vehicle-rental/${vehicle.id}`}>
        <h2>{vehicle.vehicleModel}</h2>
      </Link>
      <p>Category: {vehicle.category}</p>
      <p>Daily Price: ${vehicle.dailyPrice.toFixed(2)}</p>
      <p>Status: {vehicle.availabilityStatus}</p>
    </div>
  );
};

export default VehicleRentalListing;