import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import Button from "../../components/shared/button/Button";
import LoginModal from "../../components/modals/login/LoginModal.jsx"; // مودال ارسال کد

const Login = () => {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
      const response = await fetch("http://127.0.0.1:8000/graphql/", {
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
        sessionStorage.setItem("sessionToken", token); // ذخیره توکن در سشن
        setMessage("ورود موفقیت‌آمیز بود!");
        setTimeout(() => navigate("/dashboard"), 1000); // هدایت به پنل کاربری
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

          {/* فرم با Formik */}
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

      {/* نمایش مودال ارسال کد */}
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Login;
