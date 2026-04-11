const express = require("express");
const cors = require("cors");
const path = require("path");
const dbconnection = require("./database");
const userRoutes = require("./Routes/user_route");
const productRoutes = require("./Routes/product_route");
const categoryRoutes = require("./Routes/category_route");

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error("Not allowed by CORS"));
        },
    })
);

dbconnection();

app.use("/api/users", userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/category", categoryRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});