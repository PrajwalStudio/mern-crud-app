const express = require("express");
const dbconnection = require("./database");
const userRoutes = require("./Routes/user_route");

const app = express();

app.use(express.json());

dbconnection();

app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});