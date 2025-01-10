import React from "react";
import { Routes, Route } from "react-router-dom";

import { Provider } from "react-redux"; 
import { store } from "./redux/store"; 
import Home from "./pages/home/home.jsx";
import UserDashboard from "./pages/userdashboard/userDashboard.jsx";
import SignUp from "./pages/signup/signUp.jsx";
import Header from "./components/common/header/header.jsx";
import Notfound from "./pages/notfound/notFound.jsx";
import Footer from "./components/common/footer/footer.jsx";
import Login from "./pages/login/login.jsx";

import EventDetail from "./pages/eventDetail/eventDetail.jsx";
import EventList from "./pages/eventList/eventList.jsx";
import AboutUs from "./pages/aboutUs/aboutUs.jsx";
import PrivacyPolicyAndTermsofService from "./pages/privacyPolicy/privacyPolicyAndTermsofService.jsx";


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
        <Route path="/eventDetail" element={<EventDetail />} />
        <Route path="/eventList" element={<EventList />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicyAndTermsofService />}
        />

      </Routes>
      <Footer />
    </Provider>
  );
};

export default App;
