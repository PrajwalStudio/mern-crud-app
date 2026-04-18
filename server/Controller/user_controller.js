const usermodel = require("../Models/user_model");
const jwt = require("jsonwebtoken");
const secretKey = "mernbatch";

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        console.log(req.body);

        const user = new usermodel({
            name,
            email,
            password,
            phone,
            address
        });

        await user.save();

        res.status(201).json({
            message: "User Registered",
            udata: user
        });

    } catch (error) {
        res.status(500).json({
            message: "Error While Registering",
            error: error.message
        });
    }
};
const getUser = async (req, res) => {
    try {
        const allUsers = await usermodel.find();
        console.log(allUsers);
        res.status(200).json({ message: "All User Details", fetcheduser: allUsers })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error })
    }
};
const getUserById = async (req, res) => {
    try {
        const userid = req.params.id
        //const {id}=req.params
        const singleUser = await usermodel.findById(userid)
        console.log(singleUser)
        res.status(200).json({ message: "User Found", foundUser: singleUser });
    } catch (error) {
        res.status(500).json({ message: "User Not Found", error })
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const deleteuser = await usermodel.findByIdAndDelete(id);
        if (!deleteuser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', deletedUser: deleteuser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
const updateuser = async (req, res) => {

    try {
        const { id } = req.params
        const body = req.body
        const updateduser = await usermodel.findByIdAndUpdate(id, body, { new: true })
        console.log(updateduser)
        res.status(201).json({ message: "user updated", update: updateduser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error", error })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email, password });
        if (user) {
            const utoken = await jwt.sign({ id: user._id }, secretKey);
            res.json({ success: true, message: "Login successful", user, token: utoken });

        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }


    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Login error", error });
    }
}
const getProfile = async (req, res) => {
    try {
        const user = await usermodel.findById(req.userid);
        res.json({ success: true, message: "Authorized User", udata: user });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Profile error", error });
    }
}
module.exports = { updateuser, deleteUser, getUserById, getUser, registerUser, login,getProfile };