import React from "react";
import styles from "./privacypolicyandtermsofservice.module.css";

const PrivacyPolicy = () => {
  return (
    <div className={styles["legal-container"]}>
      <h1>سیاست حفظ حریم خصوصی</h1>
      <div className={styles["legal-content"]}>
        <section>
          <h3>مقدمه</h3>
          <p>
            به یکی کمه خوش آمدید. حفظ حریم خصوصی کاربران ما بسیار مهم است. این
            سند توضیح می‌دهد که ما چگونه با اطلاعات شما برخورد می‌کنیم.
          </p>
        </section>

        <section>
          <h3>اطلاعات جمع‌آوری شده</h3>
          <p>
            ما حداقل اطلاعات مورد نیاز برای ارائه خدمات را جمع‌آوری می‌کنیم:
          </p>
          <ul>
            <li>نام کاربری</li>
            <li>آدرس ایمیل</li>
            <li>اطلاعات رویدادهایی که ایجاد یا در آن‌ها شرکت می‌کنید</li>
          </ul>
        </section>

        <section>
          <h3>استفاده از اطلاعات</h3>
          <p>ما از اطلاعات شما فقط برای موارد زیر استفاده می‌کنیم:</p>
          <ul>
            <li>ارائه خدمات پلتفرم یکی کمه</li>
            <li>بهبود تجربه کاربری</li>
            <li>ارتباط با شما در مورد رویدادها</li>
          </ul>
        </section>

        <section>
          <h3>امنیت اطلاعات</h3>
          <p>
            ما متعهد به حفاظت از اطلاعات شما هستیم و از روش‌های امنیتی مناسب
            برای محافظت از داده‌های شما استفاده می‌کنیم.
          </p>
        </section>

        <section>
          <h3>تماس با ما</h3>
          <p>
            اگر سوالی در مورد سیاست حفظ حریم خصوصی ما دارید، لطفاً با ما تماس
            بگیرید:
            <br />
            ایمیل: support@yekikame.ir
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
