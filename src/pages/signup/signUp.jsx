import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "../../components/shared/button/button.jsx";
import OTPModal from "../../components/modals/OTPModal/otpModal.jsx";
import styles from "./signup.module.css";

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  const handleModalClose = () => setModalOpen(false);

  const handleModalSubmit = async (otp) => {
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
        const token = data.data.verifyOtp.token;
        sessionStorage.setItem("sessionToken", token);
        sessionStorage.setItem("userPhone", userPhoneNumber);
        setMessage("ثبت نام شما با موفقیت انجام شد!");
        setTimeout(() => {
          window.location.href = "/dashboard"; // ریدایرکت با ریفرش صفحه
        }, 1000);
      } else {
        setMessage("کد تأیید نادرست است. لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("خطایی در تأیید کد رخ داده است.");
    }
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
        setUserPhoneNumber(values.phoneNumber);
        setModalOpen(true);
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
                {/* فرم فیلدها */}
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

                <Button
                  text="تأیید و دریافت کد"
                  className={styles["signup-button"]}
                  disabled={isSubmitting}
                  type="submit"
                  customStyles={{
                    width: "100%",
                    height: "56px",
                    fontSize: "18px",
                    padding: "12px",
                  }}
                />
                {message && <p className={styles["message"]}>{message}</p>}
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
        mode="signup"
      />
    </div>
  );
};

export default SignUp;
