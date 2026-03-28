const express = require("express");
const cors = require("cors");
const dbconnection = require("./database");
const userRoutes = require("./Routes/user_route");
const productRoutes = require("./Routes/product_route");


const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // React Vite default

dbconnection();

app.use("/api/users", userRoutes);
app.use("/api/products",productRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});