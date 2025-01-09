import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; // اضافه شده برای اتصال Redux
import { store } from "./redux/store"; // Store فقط برای CreateEvent
import Home from "./pages/home/Home";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import SignUp from "./pages/signup/Signup";
import Header from "./components/common/header/Header";
import Notfound from "./pages/notfound/Notfound";
import Footer from "./components/common/footer/Footer";
import Login from "./pages/login/login";
import EventDetail from "./pages/eventDetail/eventDetail.jsx";
import EventList from "./pages/eventList/eventList.jsx";
import AboutUs from "./pages/aboutUs/aboutUs.jsx";
import PrivacyPolicy from "./pages/privacyPolicy/privacyPolicy.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/eventdetail" element={<EventDetail />} />
        <Route path="/eventlist" element={<EventList />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </Provider>
  );
};

export default App;
