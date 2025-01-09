const express = require("express");
const { registerUser, authUser, getUserCount, getAllUsers, getTotalTimeSpentUser, updateUserTimeSpent } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Kullanıcı kayıt rotası
router.post("/register", registerUser);

// Kullanıcı kimlik doğrulama rotası
router.post("/login", authUser);

// Kullanıcı sayısını dönen rota
router.get("/user-count", getUserCount);

// Tüm kullanıcıları çeken rota
router.get("/users", getAllUsers);

// Kullanıcı süre bilgilerini dönen rota
router.get("/users-total-time", getTotalTimeSpentUser);

// Kullanıcı süre bilgilerini güncelleyen rota
router.post("/users-update-time", updateUserTimeSpent);


module.exports = router;
