import React, { useState } from "react";
import styles from "./Login.module.css";
import Button from "../../components/shared/button/Button";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/graphql/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              loginUser(phone: "${phoneNumber}", password: "${password}") {
                success
              }
            }
          `,
        }),
      });

      const data = await response.json();
      if (data?.data?.loginUser?.success) {
        setMessage("ورود موفقیت‌آمیز بود!");
      } else {
        setMessage("شماره تلفن یا رمز عبور اشتباه است.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("خطایی در ارتباط با سرور رخ داده است.");
    }
  };

  return (
    <div className={styles["login-full"]}>
      <div className={styles["login-right"]}>
        <div className={styles["form-container"]}>
          <div className={styles["text-up"]}>
            <span className={styles["text-head"]}>ورود به حساب کاربری </span>
            <span className={styles["text-down"]}>
              خوشحالیم که دوباره می‌بینیمت :)
            </span>
          </div>
          <div className={styles["form-wrapper"]}>
            <form onSubmit={handleLogin}>
              <label>لطفاً شماره تلفن همراه خود را وارد کنید:</label>
              <div>
                <input
                  type="number"
                  className={styles["input-design"]}
                  placeholder="شماره همراه"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <label>لطفاً رمز عبور خود را وارد کنید:</label>
              <div>
                <input
                  type="password"
                  className={styles["input-design"]}
                  placeholder="رمز عبور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <span className={styles["terms"]}>
                ورود به حساب به معنی پذیرش{" "}
                <a href="/terms">شرایط استفاده از خدمات</a> است.
              </span>
              <div>
                <Button text="ورود" className={styles["btn-primary"]} />
              </div>
              {message && <p className={styles["message"]}>{message}</p>}
            </form>
          </div>
        </div>
      </div>
      <div className={styles["login-left"]}></div>
    </div>
  );
};

export default Login;
