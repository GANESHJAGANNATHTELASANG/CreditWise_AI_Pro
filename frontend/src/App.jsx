import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerifyLoginOtp from "./pages/VerifyLoginOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordOtp from "./pages/ForgotPasswordOtp";
import ResetPassword from "./pages/ResetPassword";
import ApplyLoan from "./pages/ApplyLoan";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-login-otp" element={<VerifyLoginOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-otp" element={<ForgotPasswordOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/apply-loan" element={<ApplyLoan />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
