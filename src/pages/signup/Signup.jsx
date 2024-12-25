import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "../../components/shared/button/Button";
import OTPModal from "../../components/modals/OTPModal/OTPModal";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState(""); // ذخیره شماره تلفن
  const [sessionToken, setSessionToken] = useState(""); // ذخیره توکن نشست

  const handleModalClose = () => setModalOpen(false);

  const handleModalSubmit = async (otp) => {
    console.log("کد OTP وارد شده:", otp);

    const query = `
      mutation {
        verifyOtp(phone: "${userPhoneNumber}", otp: ${otp}) {
          success
          token
        }
      }
    `;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/graphql/",
        { query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data?.data?.verifyOtp?.success) {
        setMessage("کد تأیید با موفقیت ثبت شد!");
        setSessionToken(data.data.verifyOtp.token); // ذخیره توکن
        console.log("توکن دریافت‌شده:", data.data.verifyOtp.token);
        setModalOpen(false); // Close OTP Modal
      } else {
        setMessage("کد تأیید نادرست است. لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("خطایی در تأیید کد رخ داده است.");
    }
    setModalOpen(false);
  };

  const handleSignup = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const query = `
      mutation {
        registerUser(phone: "${values.phoneNumber}", password: "${values.password}") {
          success
        }
      }
    `;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/graphql/",
        { query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data?.data?.registerUser?.success) {
        setMessage("ثبت نام با موفقیت انجام شد!");
        setUserPhoneNumber(values.phoneNumber); // شماره تلفن ذخیره شود
        setModalOpen(true); // باز کردن مودال
      } else {
        setMessage("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("خطایی در ارتباط با سرور رخ داده است.");
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required("شماره تلفن ضروری است.")
      .matches(/^\d{10,11}$/, "شماره تلفن باید معتبر باشد."),
    password: Yup.string()
      .required("رمز عبور ضروری است.")
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "رمز عبور و تکرار آن مطابقت ندارد.")
      .required("تکرار رمز عبور ضروری است."),
  });

  return (
    <div className={styles["signup-page"]}>
      <div className={styles["signup-leftcontainer"]}></div>
      <div className={styles["signup-rightcontainer"]}>
        <div className={styles["signup-form"]}>
          <div className={styles["textup"]}>
            <h1 className={styles["texthead"]}>ثبت نام در یکی کمه</h1>
            <span className={styles["textdown"]}>
              خوش‌حالیم که می‌خواهی به کمپین یکی کمه بپیوندی :)
            </span>
          </div>
          <Formik
            initialValues={{
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            {({ isSubmitting }) => (
              <Form className={styles["form"]}>
                <label className={styles["form-label"]}>
                  لطفاً برای ثبت نام، شماره تلفن همراه خود را وارد کنید:
                </label>
                <Field
                  type="text"
                  name="phoneNumber"
                  className={styles["inputs"]}
                  placeholder="شماره همراه"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className={styles["error"]}
                />

                <label className={styles["form-label"]}>
                  لطفاً رمز عبور خود را انتخاب نمائید:
                </label>
                <Field
                  type="password"
                  name="password"
                  className={styles["inputs"]}
                  placeholder="رمز عبور"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles["error"]}
                />

                <Field
                  type="password"
                  name="confirmPassword"
                  className={styles["inputs"]}
                  placeholder="تکرار رمز عبور"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={styles["error"]}
                />

                <div>
                  <span className="form-subtitle">شرایط استفاده از </span>
                  <span
                    className="form-sublink"
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => (window.location.href = "/privacy-policy")}
                  >
                    خدمات و حریم خصوصی یکی کمه
                  </span>
                  <span className="form-subtitle"> را می‌پذیرم.</span>
                </div>

                <Button
                  text="تأیید و دریافت کد"
                  className={styles["signup-button"]}
                  disabled={isSubmitting}
                  customStyles={{
                    width: "100%",
                    height: "56px",
                    fontSize: "18px",
                    padding: "12px",
                  }}
                />
                {message && <p className={styles["message"]}>{message}</p>}
                <div style={{ height: "64px" }}></div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <OTPModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        phoneNumber={userPhoneNumber}
      />
    </div>
  );
};

export default SignUp;
