

const express = require ("express");
const router = express.Router();

const {loginUser, signupUser} = require ("../controllers/userControllers");

// POST /api/users/login
router.post("/login", loginUser);

// POST /api/users/signup
router.post("/signup", signupUser);

module.exports = router;