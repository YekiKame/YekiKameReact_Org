import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "../../components/shared/button/Button";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [message, setMessage] = useState("");

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
        setMessage("ثبت‌نام موفقیت‌آمیز بود! لطفاً کد تأیید را وارد کنید.");
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
                  <span className="form-sublink">خدمات و حریم خصوصی یکی کمه</span>
                  <span className="form-subtitle"> را می‌پذیرم.</span>
                </div>
                <div>
                  <Button
                    text="ثبت‌نام"
                    className={styles["signup-button"]}
                    disabled={isSubmitting}
                  />
                </div>
                {message && <p className={styles["message"]}>{message}</p>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
