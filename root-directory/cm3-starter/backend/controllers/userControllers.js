const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT
const generateToken = (_id) => {
  return jwt.sign(
    { _id },
    process.env.SECRET,
    {
      expiresIn: "3d",
    }
  );
};

// Signup user
const signupUser = async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      phone_number,
      licenseNumber,
      date_of_birth,
      address,
    } = req.body;

    // Get fields from address
    const {
      licenseExpiryDate,
      city,
      yearsOfExperience,
    } = address || {};

    // Check required fields
    if (
      !name ||
      !username ||
      !password ||
      !phone_number ||
      !licenseNumber ||
      !date_of_birth ||
      !address ||
      !licenseExpiryDate ||
      !city ||
      yearsOfExperience === undefined ||
      yearsOfExperience === null ||
      yearsOfExperience === ""
    ) {
      return res.status(400).json({
        error: "Please add all fields",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      phone_number,
      licenseNumber,
      date_of_birth,
      address: {
        licenseExpiryDate,
        city,
        yearsOfExperience,
      },
    });

    // Check if user was created
    if (!user) {
      return res.status(400).json({
        error: "Invalid user data",
      });
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Return response
    return res.status(201).json({
      username: user.username,
      token,
    });

  } catch (error) {
    console.error("Signup error:", error);

    return res.status(400).json({
      error: error.message,
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const {
      username,
      password,
    } = req.body;

    // Check required fields
    if (!username || !password) {
      return res.status(400).json({
        error: "Please provide username and password",
      });
    }

    // Find user
    const user = await User.findOne({ username });

    // Check username and password
    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      // Generate JWT
      const token = generateToken(user._id);

      return res.status(200).json({
        username: user.username,
        token,
      });
    }

    return res.status(400).json({
      error: "Invalid credentials",
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  signupUser,
  loginUser,
};