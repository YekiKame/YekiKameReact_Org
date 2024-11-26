import React from "react";
import Header from "../components/common/Header";
import Footer from '../components/common/Footer';

const HomePage = () => {
  const events = [
    { id: 1, image: "/picture-1.png", title: "رویداد ۱", time: "۱۰:۳۰ دوشنبه", participants: "۲۳ نفر", location: "مکان ۱", category: "دسته‌بندی ۱" },
    { id: 2, image: "/picture-2.png", title: "رویداد ۲", time: "۱۱:۳۰ سه‌شنبه", participants: "۱۲ نفر", location: "مکان ۲", category: "دسته‌بندی ۲" },
    { id: 3, image: "/picture-3.png", title: "رویداد ۳", time: "۱۲:۳۰ چهارشنبه", participants: "۳۴ نفر", location: "مکان ۳", category: "دسته‌بندی ۳" },
    { id: 4, image: "/picture-4.png", title: "رویداد ۴", time: "۱۴:۳۰ پنج‌شنبه", participants: "۴۵ نفر", location: "مکان ۴", category: "دسته‌بندی ۴" },
  ];
  return (
    <div>
      <Header />
      <Footer />

    </div>
  );
};

export default HomePage;