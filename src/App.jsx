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
import EventList from "./pages/eventList/eventlist.jsx";
import AboutUs from "./pages/aboutUs/aboutUs.jsx";
// import PrivacyPolicy from "./pages/privacyPolicy/privacyPolicyAndTermsofService.jsx";
import PrivacyPolicyAndTermsofService from "./pages/privacyPolicy/privacyPolicyAndTermsofService.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/eventdetail/:eventId" element={<EventDetail />} />
        <Route path="/eventList" element={<EventList />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicyAndTermsofService />}
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </Provider>
  );
};

export default App;
