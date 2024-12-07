import React, { useState } from "react";
import "./signup.css";
import Button from "../../components/shared/button/Button";

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("رمز عبور و تکرار آن مطابقت ندارد.");
      return;
    }
    console.log("Form submitted:", { phoneNumber, password });
    // ارسال اطلاعات ثبت‌نام به سرور
  };

  return (
    <>
    <div className="singup-full">
<div className="singup-right">
<div className="formpos">
    <div className="textup">
<span className="texthead">ثبت نام در یکی کمه</span>
<span className="textdown">خوش‌حالیم که می‌خواهی به کمپین یکی کمه بپیوندی :)</span>
    </div>
<div className="formm">
<form action="#">
  <label htmlFor="#"> لطفاً برای ثبت نام،‌ شماره تلفن همراه خود را وارد کنید:</label>
  <div className="">
<input type="number" className="inputsdesgin" placeholder="شماره همراه"  />
  </div>
  <label htmlFor="#">لطفاً رمز عبور خود را انتخاب نمائید:</label>
  <div className="">
<input type="text" className="inputsdesgin" placeholder="رمز عبور"  />
  </div>
  <div className="dalam">
<input type="text" className="inputsdesgin" placeholder="تکرار رمز عبور "  />
  </div>
  <span> شرایط استفاده از خدمات و حریم خصوصی یکی کمه را می‌پذیرم.</span>
  <div>
    <Button
      text='تأیید و دریافت کد'
      className='btn-primary'
      onClick={()=>console.log("دکمه کلیک شد")}
    />
  </div>
</form>
</div>
</div>
</div>
<div className="singup-left">
</div>
    </div>
    </>
  );
};

export default SignUp;
