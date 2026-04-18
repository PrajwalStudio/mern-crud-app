const express = require("express");
const router = express.Router();
const auth=require("../Middleware/AuthUser")

const {updateuser,deleteUser,registerUser,getUser, getUserById,login,getProfile} = require("../Controller/user_controller");

router.get("/getUser",getUser)
router.post("/register", registerUser);
router.get("/getUserById/:id", getUserById);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateuser/:id", updateuser);
router.post("/login",login);
router.get("/profile", auth,getProfile);//auth act as middleware
module.exports = router;