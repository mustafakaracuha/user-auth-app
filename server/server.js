const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "*", // Tüm kaynaklardan gelen isteklere izin ver
        methods: ["GET", "POST", "PUT", "DELETE"], // İzin verilen HTTP metodları
        allowedHeaders: ["Content-Type", "Authorization"], // İzin verilen başlıklar
    })
);

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
