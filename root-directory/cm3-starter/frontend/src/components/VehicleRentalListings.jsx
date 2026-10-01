import VehicleRentalListing from "./VehicleRentalListing";

const VehicleRentalListings = ({vehicleRentals}) => {
  return (
    <div className="rental-list">
      {vehicleRentals.map((vehicle) => (
      <VehicleRentalListing key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleRentalListings;
