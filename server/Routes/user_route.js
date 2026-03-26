const express = require("express");
const router = express.Router();

const {updateuser,deleteUser,registerUser,getUser, getUserById} = require("../Controller/user_controller");

router.get("/getUser",getUser)
router.post("/register", registerUser);
router.get("/getUserById/:id", getUserById);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateuser/:id", updateuser);

module.exports = router;