const VehicleRentalListing = ({vehicle}) => {
  return (
    <div className="rental-preview">
      <h2>{vehicle.vehicleModel}</h2>
      <p>Category: {vehicle.category}</p>
      <p>Daily Price: ${vehicle.dailyPrice.toFixed(2)}</p>
      <p>Status: {vehicle.availabilityStatus}</p>
    </div>
  );
};

export default VehicleRentalListing;

