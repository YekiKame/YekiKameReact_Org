import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./login.module.css";
import Button from "../../components/shared/button/button.jsx";
import LoginModal from "../../components/modals/login/loginModal.jsx";

const Login = () => {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // اسکیمای اعتبارسنجی
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^\d{10,11}$/, "شماره همراه باید ۱۰ یا ۱۱ رقم باشد.")
      .required("شماره همراه ضروری است."),
    password: Yup.string()
      .required("رمز عبور ضروری است.")
      .min(6, "رمز عبور حداقل باید ۶ کاراکتر باشد."),
  });

  // تابع ورود کاربر
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://95.217.8.192:8000/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation {
              loginUser(phone: "${values.phoneNumber}", password: "${values.password}") {
                success
                token
              }
            }
          `,
        }),
      });

      const data = await response.json();
      if (data?.data?.loginUser?.success) {
        const token = data.data.loginUser.token;
        sessionStorage.setItem("sessionToken", token);
        sessionStorage.setItem("userPhone", values.phoneNumber);
        setMessage("ورود موفقیت‌آمیز بود!");
        setTimeout(() => {
          window.location.href = "/dashboard"; // ریدایرکت با ریفرش صفحه
        }, 1000);
      } else {
        setMessage("شماره تلفن یا رمز عبور اشتباه است.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("خطایی در ارتباط با سرور رخ داده است.");
    }
    setSubmitting(false);
  };

  return (
    <div className={styles["login-full"]}>
      <div className={styles["login-right"]}>
        <div className={styles["form-container"]}>
          <div className={styles["text-up"]}>
            <h3 className={styles["text-head"]}>ورود به حساب کاربری</h3>
          </div>

          <Formik
            initialValues={{ phoneNumber: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className={styles["form-wrapper"]}>
                <div>
                  <Field
                    type="text"
                    name="phoneNumber"
                    className={styles["input-design"]}
                    placeholder="شماره همراه"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className={styles["error-message"]}
                  />
                </div>

                <div>
                  <Field
                    type="password"
                    name="password"
                    className={styles["input-design"]}
                    placeholder="رمز عبور"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles["error-message"]}
                  />
                </div>

                <div className={styles["button-container"]}>
                  <Button
                    size="large"
                    text={"ورود"}
                    type="submit"
                    className={styles["login-button"]}
                    disabled={isSubmitting}
                  />
                  <Button
                    size="large"
                    variant="outline"
                    text={"ورود از طریق ارسال کد"}
                    onClick={() => setIsModalOpen(true)}
                  />
                </div>

                {message && <p className={styles["message"]}>{message}</p>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className={styles["login-left"]}></div>

      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Login;
