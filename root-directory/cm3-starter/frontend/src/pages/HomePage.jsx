import { useState, useEffect } from "react";
import VehicleRentalListings from "../components/VehicleRentalListings";

const Home = () => {
  const [vehicleRentals, setVehicleRentals] = useState([null]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleRentals = async () => {
      try {
        const res = await fetch("/api/vehicleRentals");
        if (!res.ok) {
          throw new Error("could not fecth the data for that");
        }
        const data = await res.json();
        setIsPending(false);
        setVehicleRentals(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    fetchVehicleRentals();
  }, []);
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {vehicleRentals && <VehicleRentalListings vehicleRentals={vehicleRentals} />}
    </div>
  );
};

export default Home;

