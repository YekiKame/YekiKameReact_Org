import React, { useState } from "react";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  return (
    <div className="contact-form-container">
      <h1 className="form-title">تماس با ما</h1>
      <p className="form-subtitle">
        شما در این قسمت می‌توانید برای ما پیام بگذارید:
      </p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <InputField
            label="نام و نام خانوادگی"
            name="name"
            placeholder="مثال: کوروش همایونی"
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputField
            label="ایمیل"
            name="email"
            placeholder="persian@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <InputField
          label="عنوان"
          name="subject"
          placeholder="مثال: سوال در مورد رویداد ورزشی"
          value={formData.subject}
          onChange={handleInputChange}
        />
        <TextAreaField
          label="پیام"
          name="message"
          placeholder="پیام‌های خود را در اینجا بنویسید"
          value={formData.message}
          onChange={handleInputChange}
        />
        <button type="submit" className="submit-button">
          ثبت
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
