const VehicleRental = require('../models/vehicleRentalModel');
const mongoose = require('mongoose');

// GET /api/vehicleRentals
const getAllVehicleRentals = async (req, res) => {
  try {
    const vehicleRentals = await VehicleRental.find({}).sort({createAt: -1});
    res.status(200).json(vehicleRentals);
  } catch (error) {
    res.status(500).json({message: "failed to retrieve vehicle rental"})
  }
};

// POST /api/vehicleRentals
const createVehicleRental = async (req, res) => {
  try {
    const newVehicleRental = await VehicleRental.create({ ...req.body });
    res.status(201).json(newVehicleRental);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create vehicle rentals", error: error.message });
  }
};

// GET /api/vehicleRentals/:vehicleRentalId
const getVehicleRentalById = async (req, res) => {
  const { vehicleRentalId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
    return res.status(400).json({ message: "Invalid vehicle rentals ID" });
  }

  try {
    const vehicleRentals = await VehicleRental.findById(vehicleRentalId);
    if (vehicleRentals) {
      res.status(200).json(vehicleRentals);
    } else {
      res.status(404).json({ message: "Vehicle rentals not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve vehicle rentals" });
  }
};

// PUT /api/vehicleRentals/:vehicleRentalId
const updateVehicleRental = async (req, res) => {
  const { vehicleRentalId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
    return res.status(400).json({ message: "Invalid vehicle rentals ID" });
  }

  try {
    const updatedVehicleRentals = await VehicleRental.findOneAndUpdate(
      { _id: vehicleRentalId },
      { ...req.body },
      { returnDocument: "after" }
    );
    if (updatedVehicleRentals) {
      res.status(200).json(updatedVehicleRentals);
    } else {
      res.status(404).json({ message: "Vehicle Rentals not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update vehicle rentals" });
  }

};

// DELETE /api/vehicleRentals/:vehicleRentalId
const deleteVehicleRental = async (req, res) => {
  const { vehicleRentalId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(vehicleRentalIdId)) {
    return res.status(400).json({ message: "Invalid vehicle rentals ID" });
  }

  try {
    const deletedVehicleRentals = await VehicleRental.findOneAndDelete({ _id: vehicleRentalId });
    if (deletedVehicleRentals) {
      res.status(204).send(); 
    } else {
      res.status(404).json({ message: "Vehicle rentals not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete vehicle rentals" });
  }
};

module.exports = {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
};
