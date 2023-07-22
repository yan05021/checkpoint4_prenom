const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const resultControllers = require("./controllers/resultControllers");

router.get("/api/users", userControllers.getAllUsers);
router.post("/api/login", userControllers.loginUser);

router.get("/api/results", resultControllers.getAllResults);
router.post("/api/results", resultControllers.addResults);

router.put("/api/results/:userId", resultControllers.updateResults);
router.delete("/api/results/:userId", resultControllers.deleteResults);

module.exports = router;
