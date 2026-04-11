import React from "react";
import { Routes, Route } from "react-router-dom";

import UserHome from "../UComponents/UserHome";
import UserAbout from "../UComponents/UserAbout";
import UserLogin from "../UComponents/UserLogin";
import UserRegister from "../UComponents/UserRegister";
import UserTopbar from "../UComponents/UserTopbar";
import ViewProduct from "../UComponents/ViewProduct";

export default function UserRoutes() {
  return (
    <>
      <UserTopbar />

      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/about" element={<UserAbout />} />
        <Route path="/viewproduct" element={<ViewProduct />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
      </Routes>
    </>
  );
}