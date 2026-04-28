import React from "react";
import { Routes, Route } from "react-router-dom";

import UserHome from "../UComponents/UserHome";
import UserAbout from "../UComponents/UserAbout";
import UserLogin from "../UComponents/UserLogin";
import UserRegister from "../UComponents/UserRegister";
import UserTopbar from "../UComponents/UserTopbar";
import ViewProduct from "../UComponents/ViewProduct";
import BookingForm from "../UComponents/BookingForm";
import MyBookings from "../UComponents/MyBookings";
import ProductDetail from "../UComponents/ProductDetail";
import Profile from "../UComponents/Profile";

export default function UserRoutes() {
  return (
    <>
      <UserTopbar />

      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/about" element={<UserAbout />} />
        <Route path="/viewproduct" element={<ViewProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/booking/:id" element={<BookingForm />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/update" element={<Profile />} />
      </Routes>
    </>
  );
}