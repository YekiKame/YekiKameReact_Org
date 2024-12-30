import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./editprofiletab.module.css";
import Button from "../../shared/button/button.jsx";

// Import icons
import UserIcon from "../../../assets/icons/userdash.svg";
import PhoneIcon from "../../../assets/icons/calldash.svg";
import EmailIcon from "../../../assets/icons/emaildash.svg";
import EyeIcon from "../../../assets/icons/eyedash.svg";
import EyeSlashIcon from "../../../assets/icons/eyeslashdash.svg";

const EditProfileTab = () => {
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const query = `
          query {
            getUserSession {
              phone
              email
              fullname
            }
          }
        `;

        const response = await axios.post(
          "http://127.0.0.1:8000/graphql/",
          { query },
          { headers: { "Content-Type": "application/json" } }
        );

        const userData = response.data?.data?.getUserSession;
        if (userData) {
          setInitialValues({
            fullName: userData.fullname || "",
            phoneNumber: userData.phone || "",
            email: userData.email || "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("خطایی در دریافت اطلاعات کاربر رخ داد.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const validationSchema = Yup.object({
    fullName: Yup.string().optional(),
    email: Yup.string().email("ایمیل نامعتبر است").optional(),
    oldPassword: Yup.string().optional(),
    newPassword: Yup.string()
      .optional()
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
      .when("oldPassword", {
        is: (val) => val && val.length > 0,
        then: Yup.string().required("لطفاً رمز عبور جدید را وارد کنید"),
      }),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "تکرار رمز عبور با رمز جدید مطابقت ندارد"
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setMessage("");
    try {
      // Update Fullname
      if (values.fullName) {
        const updateFullnameMutation = `
          mutation {
            updateFullname(phone: "${values.phoneNumber}", fullname: "${values.fullName}") {
              success
              message
            }
          }
        `;
        const fullnameResponse = await axios.post(
          "http://127.0.0.1:8000/graphql/",
          { query: updateFullnameMutation },
          { headers: { "Content-Type": "application/json" } }
        );
        const fullnameResult = fullnameResponse.data?.data?.updateFullname;
        if (!fullnameResult?.success) {
          setMessage(fullnameResult?.message || "خطایی در به‌روزرسانی نام رخ داد.");
          return;
        }
      }

      // Update Password
      if (values.oldPassword && values.newPassword) {
        const updatePasswordMutation = `
          mutation {
            updatePassword(phone: "${values.phoneNumber}", oldPassword: "${values.oldPassword}", newPassword: "${values.newPassword}") {
              success
              message
            }
          }
        `;
        const passwordResponse = await axios.post(
          "http://127.0.0.1:8000/graphql/",
          { query: updatePasswordMutation },
          { headers: { "Content-Type": "application/json" } }
        );
        const passwordResult = passwordResponse.data?.data?.updatePassword;
        if (!passwordResult?.success) {
          setMessage(passwordResult?.message || "خطایی در به‌روزرسانی رمز عبور رخ داد.");
          return;
        }
      }

      // Display success message
      setMessage("اطلاعات با موفقیت به‌روزرسانی شد!");
      resetForm();
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      setMessage("خطایی در ارتباط با سرور رخ داد.");
    }
  };

  if (loading) {
    return <p>در حال بارگذاری...</p>;
  }

  return (
    <div className={styles["editprofileTab"]}>
      <h2 className={styles["title"]}>ویرایش اطلاعات</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form className={styles.form}>
            <div className={styles["field-container"]}>
              <Field
                type="text"
                name="fullName"
                placeholder="نام و نام خانوادگی"
                className={styles["input"]}
              />
              <img src={UserIcon} alt="User Icon" className={styles["icon"]} />
              <ErrorMessage name="fullName" component="div" className={styles["error"]} />
            </div>

            <div className={styles["field-container"]}>
              <Field
                type="text"
                name="phoneNumber"
                placeholder="شماره تلفن"
                className={styles["input"]}
                disabled
              />
              <img src={PhoneIcon} alt="Phone Icon" className={styles["icon"]} />
            </div>

            <div className={styles["field-container"]}>
              <Field
                type="email"
                name="email"
                placeholder="ایمیل (اختیاری)"
                className={styles["input"]}
              />
              <img src={EmailIcon} alt="Email Icon" className={styles["icon"]} />
              <ErrorMessage name="email" component="div" className={styles["error"]} />
            </div>

            <div className={styles["field-container"]}>
              <Field
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                placeholder="رمز عبور فعلی"
                className={styles["input"]}
              />
              <img
                src={showPassword ? EyeIcon : EyeSlashIcon}
                alt="Toggle Password Visibility"
                className={styles["icon"]}
                onClick={() => setShowPassword(!showPassword)}
              />
              <ErrorMessage name="oldPassword" component="div" className={styles["error"]} />
            </div>

            <div className={styles["field-container"]}>
              <Field
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="رمز عبور جدید"
                className={styles["input"]}
              />
              <img
                src={showPassword ? EyeIcon : EyeSlashIcon}
                alt="Toggle Password Visibility"
                className={styles["icon"]}
                onClick={() => setShowPassword(!showPassword)}
              />
              <ErrorMessage name="newPassword" component="div" className={styles["error"]} />
            </div>

            <div className={styles["field-container"]}>
              <Field
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="تکرار رمز عبور جدید"
                className={styles["input"]}
              />
              <img
                src={showPassword ? EyeIcon : EyeSlashIcon}
                alt="Toggle Password Visibility"
                className={styles["icon"]}
                onClick={() => setShowPassword(!showPassword)}
              />
              <ErrorMessage name="confirmPassword" component="div" className={styles["error"]} />
            </div>

            <div className={styles["buttoncontainer"]}>
              <Button text={"ذخیره اطلاعات"} type="submit" />
              <Button
                variant="outline"
                text={"انصراف"}
                onClick={() => {
                  resetForm();
                  setMessage("");
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
      {message && <p className={styles["message"]}>{message}</p>}
    </div>
  );
};

export default EditProfileTab;
