import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import SignUp from "./pages/signup/Signup";
import Header from "./components/common/header/Header";
import Notfound from "./pages/notfound/Notfound";
import Footer from "./components/common/footer/Footer";
import Login from "./pages/login/login";

import EventDetail from "./pages/eventDetail/eventDetail.jsx";
import EventList from "./pages/eventList/eventList.jsx";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/eventDetail" element={<EventDetail />} />
        <Route path="/eventList" element={<EventList />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
