import React from "react";
import { Routes, Route } from "react-router-dom";

import UserHome from "../UComponents/UserHome";
import UserAbout from "../UComponents/UserAbout";
import UserLogin from "../UComponents/UserLogin";
import UserRegister from "../UComponents/UserRegister";
import UserTopbar from "../UComponents/UserTopbar";

export default function UserRoutes() {
  return (
    <>
      <UserTopbar />

      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/about" element={<UserAbout />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
      </Routes>
    </>
  );
}