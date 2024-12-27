import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import UserDashboard from "./pages/userdashboard/userDashboard.jsx";
import SignUp from "./pages/signup/signUp.jsx";
import Header from "./components/common/header/header.jsx";
import Notfound from "./pages/notfound/notFound.jsx";
import Footer from "./components/common/footer/footer.jsx";
import Login from "./pages/login/login.jsx";
import EventDetail from "./pages/eventDetail/eventDetail.jsx";

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
      </Routes>
      <Footer />
    </>
  );
};

export default App;
