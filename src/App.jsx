import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from './pages/Signup';
import Header from "./components/common/Header";
import Notfound from "./pages/Notfound";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="*" element={<Notfound/>} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;