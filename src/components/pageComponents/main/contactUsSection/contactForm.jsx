import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "../../../shared/button/button";
import styles from "./contactus.module.css";

const ContactUs = () => {
  const [message, setMessage] = useState("");

  const handleContactSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const query = `
      mutation {
        createContactUs(
          fullName: "${values.fullName}",
          email: "${values.email}",
          subject: "${values.subject}",
          message: "${values.message}"
        ) {
          contact {
            fullName
            email
            subject
            message
            createdAt
          }
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
      if (data?.data?.createContactUs?.contact) {
        setMessage("پیام شما با موفقیت ارسال شد!");
      } else {
        setMessage("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error("Error during contact submission:", error);
      setMessage("خطایی در ارتباط با سرور رخ داده است.");
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("نام و نام خانوادگی ضروری است."),
    email: Yup.string().email("ایمیل معتبر نیست.").required("ایمیل ضروری است."),
    subject: Yup.string().required("عنوان ضروری است."),
    message: Yup.string().required("پیام ضروری است."),
  });

  return (
    <div className={styles["contactus-page"]}>
      <h1 className={styles["header"]}>تماس با ما</h1>
      <p className={styles["description"]}>
        شما در این قسمت می‌توانید برای ما پیام بگذارید:
      </p>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          subject: "",
          message: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleContactSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles["form"]}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>نام و نام خانوادگی</label>
              <Field
                type="text"
                name="fullName"
                className={styles["input"]}
                placeholder="مثال: کوروش همایونی"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className={styles["error"]}
              />
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>ایمیل</label>
              <Field
                type="email"
                name="email"
                className={styles["input"]}
                placeholder="persian@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles["error"]}
              />
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>عنوان</label>
              <Field
                type="text"
                name="subject"
                className={styles["input"]}
                placeholder="مثال: سوال در مورد رویداد ورزشی"
              />
              <ErrorMessage
                name="subject"
                component="div"
                className={styles["error"]}
              />
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>پیام</label>
              <Field
                as="textarea"
                name="message"
                className={styles["textarea"]}
                placeholder="پیام‌های خود را در اینجا بنویسید"
              />
              <ErrorMessage
                name="message"
                component="div"
                className={styles["error"]}
              />
            </div>

            <Button
              text="ثبت"
              className={styles["submit-button"]}
              disabled={isSubmitting}
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
  );
};

export default ContactUs;
