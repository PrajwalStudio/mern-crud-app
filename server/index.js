const express = require("express");
const cors = require("cors");
const dbconnection = require("./database");
const userRoutes = require("./Routes/user_route");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // React Vite default

dbconnection();

app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});