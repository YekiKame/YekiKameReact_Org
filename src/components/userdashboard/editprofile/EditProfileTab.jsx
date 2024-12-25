import React, { useState } from "react";
import styles from "./EditprofileTab.module.css";

const EditProfileTab = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "09372726561",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>ویرایش اطلاعات</h2>
      <form className={styles.form}>
        <input
          type="text"
          name="fullName"
          placeholder="نام و نام خانوادگی"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="شماره تلفن"
          value={formData.phoneNumber}
          readOnly
        />
        <input
          type="email"
          name="email"
          placeholder="ایمیل (اختیاری)"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">ذخیره اطلاعات</button>
      </form>
    </div>
  );
};

export default EditProfileTab;