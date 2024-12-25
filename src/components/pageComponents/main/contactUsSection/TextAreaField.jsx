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

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    if (!value) {
      error = "پر کردن این فیلد الزامی است.";
    } else {
      if (name === "email" && !value.includes("@")) {
        error = "عبارت ایمیل حاوی علامت @ است.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (!formData[key]) {
        newErrors[key] = "پر کردن این فیلد الزامی است.";
      }
    });

    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.values(newErrors).every((error) => error === "")) {
      console.log("Form submitted:", formData);
      // Add form submission logic here
    }
  };

  return (
    <div className="constact-us-section">
      <div className="contact-form-container">
        <div className="form-top">
          <h1 className="form-title">تماس با ما</h1>
          <p className="form-subtitle">
            شما در این قسمت می‌توانید برای ما پیام بگذارید:
          </p>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <InputField
              label="نام و نام خانوادگی"
              name="name"
              placeholder="مثال: کوروش همایونی"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            <InputField
              label="ایمیل"
              name="email"
              placeholder="persian@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </div>
          <InputField
            label="عنوان"
            name="subject"
            placeholder="مثال: سوال در مورد رویداد ورزشی"
            value={formData.subject}
            onChange={handleInputChange}
            error={errors.subject}
          />
          <TextAreaField
            label="پیام"
            name="message"
            placeholder="پیام‌های خود را در اینجا بنویسید"
            value={formData.message}
            onChange={handleInputChange}
            error={errors.message}
          />
          <button type="submit" className="submit-button">
            ثبت
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
