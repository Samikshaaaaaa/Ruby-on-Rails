// routes/userRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

// routes/storeRoutes.js
const express = require("express");
const { listStores, rateStore } = require("../controllers/storeController");
const router = express.Router();

router.get("/", listStores);
router.post("/rate", rateStore);

module.exports = router;
