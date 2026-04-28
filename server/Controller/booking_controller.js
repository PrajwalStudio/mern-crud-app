const Booking = require("../Models/booking_model");

const AddBooking = async (req, res) => {
  try {
    const {
      fullname,
      email,
      address,
      phone,
      productId,
      quantity,
      totalamount,
    } = req.body;

    const userId = req.userid || req.body.userId;

    const booking = new Booking({
      fullname,
      email,
      address,
      phone,
      productId,
      quantity,
      totalamount,
      userId,
    });

    await booking.save();

    res.status(201).json({ message: "Booking created", booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

const GetBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("productId", "productname productprice")
      .populate("userId", "name email");

    res.status(200).json({ message: "All bookings", bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

const GetUserBookings = async (req, res) => {
  try {
    const userId = req.userid;
    const bookings = await Booking.find({ userId }).populate("productId", "productname productprice");
    res.status(200).json({ message: "User bookings", bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching user bookings", error: error.message });
  }
};

const GetBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("productId", "productname productprice")
      .populate("userId", "name email");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking found", booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching booking", error: error.message });
  }
};

const UpdateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Booking.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking updated", updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating booking", error: error.message });
  }
};

const DeleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted", deleted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting booking", error: error.message });
  }
};

module.exports = { AddBooking, GetBookings, GetUserBookings, GetBookingById, UpdateBooking, DeleteBooking };
