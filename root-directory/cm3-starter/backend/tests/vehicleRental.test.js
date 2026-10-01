
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const VehicleRental = require('../models/VehicleRental'); // Assuming you have a VehicleRental model

const api = supertest(app);

const vehicleRentals = [
    {
    vehicleModel: 'Toyota Camry',
    category: 'Economy',
    description: 'A comfortable and fuel-efficient sedan.',
    agency: {
        name: 'City Car Rentals',
        contactEmail: 'contact@citycarrentals.com',
        fleetSize: 50
    },
    location: {
        city: 'Los Angeles',
        state: 'California'
    },

    dailyPrice: 45,
    listingDate: new Date('2023-01-15'),
    availabilityStatus: 'available',
    bookingDeadline: new Date('2023-12-31'),
    insurancePolicy: 'Standard Coverage'    
    },
];

beforeEach(async () => {
    await VehicleRental.deleteMany({});
    await VehicleRental.insertMany(vehicleRentals);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("GET /api/vehicleRentals", () => {
  it("should return all vehicle rentals", async () => {
    const response = await api.get("/api/vehicleRentals").expect(200);

    expect(response.body).toHaveLength(vehicleRentals.length);
  });

  it("should return vehicle rentals as JSON with status 200", async () => {
    await api
      .get("/api/vehicleRentals")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should include a specific vehicle rental in the returned list", async () => {
    const response = await api.get("/api/vehicleRentals");

    expect(response.body.map((rental) => rental.vehicleModel)).toContain(
      "Toyota Camry"
    );
  });
});
// post
describe("POST /api/vehicleRentals", () => {
  describe("when the payload is valid", () => {
    it("should return status 201", async () => {
      const newVehicleRental = {
        vehicleModel: "Honda Civic",
        category: "Economy",
        description: "A reliable and affordable compact car.",
        agency: {
          name: "City Car Rentals",
          contactEmail: "contact@citycarrentals.com",
          fleetSize: 50
        },
        location: {
          city: "Los Angeles",
          state: "California"
        },
        dailyPrice: 40,
        listingDate: new Date("2023-01-15"),
        availabilityStatus: "available",
        bookingDeadline: new Date("2023-12-31"),
        insurancePolicy: "Standard Coverage"
      };

      await api
        .post("/api/vehicleRentals")
        .send(newVehicleRental)
        .expect(201);
    });

    it("should persist the new vehicle rental in the database", async () => {
      const newVehicleRental = {
        vehicleModel: "Honda Civic",
        category: "Economy",
        description: "A reliable and affordable compact car.",
        agency: {
          name: "City Car Rentals",
          contactEmail: "contact@citycarrentals.com",
          fleetSize: 50
        },
        location: {
          city: "Los Angeles",
          state: "California"
        },
        dailyPrice: 40,
        listingDate: new Date("2023-01-15"),
        availabilityStatus: "available",
        bookingDeadline: new Date("2023-12-31"),
        insurancePolicy: "Standard Coverage"
      };

      await api
        .post("/api/vehicleRentals")
        .send(newVehicleRental)
        .expect(201);

      const vehicleRentalsAfterPost = await VehicleRental.find({});

      expect(vehicleRentalsAfterPost).toHaveLength(
        vehicleRentals.length + 1
      );

      expect(
        vehicleRentalsAfterPost.map((rental) => rental.vehicleModel)
      ).toContain(newVehicleRental.vehicleModel);
    });
  });
});


  describe("when the payload is invalid", () => {
    it("should return status 400 when title is missing", async () => {
      const invalidVehicleRental = {
        type: "Full-Time",
        description: "Missing title should fail.",
        company: {
          name: "Cloud Solutions",
          contactEmail: "vehicles@cloudsolutions.com",
          contactPhone: "555-555-6789",
        },
      };

      await api.post("/api/vehicleRentals").send(invalidVehicleRental).expect(400);
    });

    it("should not increase the number of vehicle rentals in the database", async () => {
      const invalidVehicleRental = {
        type: "Full-Time",
        description: "Missing title should fail.",
        company: {
          name: "Cloud Solutions",
          contactEmail: "vehicles@cloudsolutions.com",
          contactPhone: "555-555-6789",
        },
      };

      await api.post("/api/vehicleRentals").send(invalidVehicleRental).expect(400);

      const vehicleRentalsAtEnd = await VehicleRental.find({});
      expect(vehicleRentalsAtEnd).toHaveLength(vehicleRentals.length);
    });
  });


// get
describe("GET /api/vehicleRentals/:id", () => {
  describe("when the id is valid", () => {
    it("should return one vehicle rental by ID", async () => {
      const vehicleRental = await VehicleRental.findOne();

      const response = await api
        .get(`/api/vehicleRentals/${vehicleRental._id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.vehicleModel).toBe(vehicleRental.vehicleModel);
    });
  });

  describe("when the id does not exist", () => {
    it("should return status 404", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      await api.get(`/api/vehicleRentals/${nonExistentId}`).expect(404);
    });
  });

  describe("when the id is invalid", () => {
    it("should return status 400", async () => {
      await api.get("/api/vehicleRentals/12345").expect(400);
    });
  });
});

// put

describe("PUT /api/vehicleRentals/:vehicleRentalId", () => {
  describe("when the id is valid", () => {
    it("should return status 200", async () => {
      const vehicleRental = await VehicleRental.findOne();

      await api
        .put(`/api/vehicleRentals/${vehicleRental._id}`)
        .send({ description: "Updated description", type: "Contract" })
        .expect(200);
    });

    it("should persist the updated fields in the database", async () => {
      const vehicleRental = await VehicleRental.findOne();
      const updates = {
        description: "Updated description",
        type: "Contract",
      };

      await api.put(`/api/vehicleRentals/${vehicleRental._id}`).send(updates).expect(200);

      const updatedVehicleRental = await VehicleRental.findById(vehicleRental._id);
      expect(updatedVehicleRental.description).toBe(updates.description);
      expect(updatedVehicleRental.type).toBe(updates.type);
    });
  });

  describe("when the id is invalid", () => {
    it("should return status 400", async () => {
      await api.put("/api/vehicleRentals/12345").send({}).expect(400);
    });
  });
});

//delete

describe("DELETE /api/vehicleRentals/:vehicleRentalId", () => {
  describe("when the id is valid", () => {
    it("should return status 204", async () => {
      const vehicleRental = await VehicleRental.findOne();

      await api.delete(`/api/vehicleRentals/${vehicleRental._id}`).expect(204);
    });

    it("should remove the vehicle rental from the database", async () => {
      const vehicleRental = await VehicleRental.findOne();

      await api.delete(`/api/vehicleRentals/${vehicleRental._id}`).expect(204);

      const deletedVehicleRental = await VehicleRental.findById(vehicleRental._id);
      expect(deletedVehicleRental).toBeNull();
    });
  });

  describe("when the id is invalid", () => {
    it("should return status 400", async () => {
      await api.delete("/api/vehicleRentals/12345").expect(400);
    });
  });
});