import  { useState, useEffect } from "react";
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
  // 1) بررسی کنیم آیا در sessionStorage یا هر منبع دیگری شماره تلفن و توکن کاربر داریم:
  const storedPhoneNumber = sessionStorage.getItem("userPhone") || "09123456789";
  const storedToken = sessionStorage.getItem("sessionToken"); // اگر توکنی دارید

  // پیام لاگ برای بررسی مقدار واقعی شماره و توکن
  console.log("Debug >> storedPhoneNumber:", storedPhoneNumber);
  console.log("Debug >> storedToken:", storedToken);

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
        console.log("Debug >> Going to fetch user data with phone:", storedPhoneNumber);

        const query = `
          query {
            user(phone: "${storedPhoneNumber}") {
              phone
              email
              fullname
            }
          }
        `;
        // اگر نیاز است هدر یا Authorization را هم بفرستید، در اینجا اضافه کنید
        const response = await axios.post(
          "http://127.0.0.1:8000/graphql/",
          { query },
          { headers: { "Content-Type": "application/json" } }
        );

        // پیام لاگ جهت دیدن پاسخ خام سرور
        console.log("Debug >> fetchUserData response:", response.data);

        const userData = response.data?.data?.user;
        if (userData) {
          setInitialValues({
            fullName: userData.fullname || "",
            phoneNumber: userData.phone || "",
            email: userData.email || "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          setMessage("کاربری با این شماره تلفن یافت نشد.");
        }
      } catch (error) {
        console.error(
          "Error fetching user data (Debug):",
          error.response?.data || error.message
        );
        setMessage("خطایی در دریافت اطلاعات کاربر رخ داد.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [storedPhoneNumber]);

  // Validation schema
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

  // Submit handler
  const handleSubmit = async (values, { resetForm }) => {
    setMessage("");

    // پیام لاگ برای بررسی اینکه کاربر چه چیزی وارد کرده است
    console.log("Debug >> handleSubmit values:", values);

    try {
      // UPDATE FULLNAME
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
        console.log("Debug >> updateFullname response:", fullnameResponse.data);
        const fullnameResult = fullnameResponse.data?.data?.updateFullname;
        if (!fullnameResult?.success) {
          setMessage(
            fullnameResult?.message || "خطایی در به‌روزرسانی نام رخ داد."
          );
          return;
        }
      }

      // UPDATE EMAIL
      if (values.email) {
        const updateEmailMutation = `
          mutation {
            updateEmail(phone: "${values.phoneNumber}", email: "${values.email}") {
              success
              message
            }
          }
        `;
        const emailResponse = await axios.post(
          "http://127.0.0.1:8000/graphql/",
          { query: updateEmailMutation },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Debug >> updateEmail response:", emailResponse.data);
        const emailResult = emailResponse.data?.data?.updateEmail;
        if (!emailResult?.success) {
          setMessage(
            emailResult?.message || "خطایی در به‌روزرسانی ایمیل رخ داد."
          );
          return;
        }
      }

      // UPDATE PASSWORD
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
        console.log("Debug >> updatePassword response:", passwordResponse.data);
        const passwordResult = passwordResponse.data?.data?.updatePassword;
        if (!passwordResult?.success) {
          setMessage(
            passwordResult?.message ||
              "خطایی در به‌روزرسانی رمز عبور رخ داد."
          );
          return;
        }
      }

      // اگر همه چیز موفق بود:
      setMessage("اطلاعات با موفقیت به‌روزرسانی شد!");
      resetForm();
    } catch (error) {
      console.error("Error updating profile (Debug):", error.response?.data || error.message);
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
