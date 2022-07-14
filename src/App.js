import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import "./App.css";
import Home from "./pages/Home/Home";
import UserInfoForm from "./pages/UserInfoForm/UserInfoForm";
import AgeError from "./pages/AgeError/AgeError";
import Summary from "./pages/Summary/Summary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-info-form" element={<UserInfoForm />} />
        <Route path="/age-error" element={<AgeError />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default hot(App);
