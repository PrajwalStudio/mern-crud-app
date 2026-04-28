const express = require("express");
const router = express.Router();
const auth = require("../Middleware/AuthUser");

const {
  AddBooking,
  GetBookings,
  GetUserBookings,
  GetBookingById,
  UpdateBooking,
  DeleteBooking,
} = require("../Controller/booking_controller");

router.post("/add", auth, AddBooking);
router.get("/get", GetBookings);
router.get("/getUserBookings", auth, GetUserBookings);
router.get("/get/:id", GetBookingById);
router.put("/update/:id", auth, UpdateBooking);
router.delete("/delete/:id", auth, DeleteBooking);

module.exports = router;
