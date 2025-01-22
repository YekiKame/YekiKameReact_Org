import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextStep, prevStep } from "../../../redux/slices/createEventSlice.js";
import Step1 from "./steps/step1/step1.jsx";
import Step2 from "./steps/step2/step2.jsx";
import Step3 from "./steps/step3/step3.jsx";
import Step4 from "./steps/step4/step4.jsx";
import Step5 from "./steps/step5/step5.jsx";
import Button from "../../shared/button/button.jsx";
import styles from "./createevent.module.css";

const CreateEvent = () => {
  const currentStep = useSelector((state) => state.createEvent.currentStep);
  const dispatch = useDispatch();

  // یک state برای رصد‌کردن اینکه stepXForm سابمیت موفق داشت یا خطا:
  const [submitOk, setSubmitOk] = useState(false);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      default:
        return <Step1 />;
    }
  };

  // تابع کمکی برای submit فرم فعلی
  const handleSubmitCurrentForm = useCallback(() => {
    const formElement = document.getElementById(`step${currentStep}Form`);
    if (formElement) {
      // ما یک eventListener موقت می‌گذاریم
      const handleSubmitEvent = (e) => {
        // اگر Formik خطایی داشته باشد، onSubmit معمولا اجرا نمی‌شود
        // اما برای اطمینان، می‌توانیم اینجا "submit" رویداد خام را بررسی کنیم
      };
      formElement.addEventListener("submit", handleSubmitEvent);

      formElement.requestSubmit();
    }
  }, [currentStep]);

  // مرحله قبل
  const handlePrev = () => {
    dispatch(prevStep());
  };

  // مرحله بعد
  const handleNext = () => {
    // سابمیت
    handleSubmitCurrentForm();
    // بدون تاخیر (یا با تاخیر کم) move next
    setTimeout(() => {
      // اگر مرحله 2 مثلاً isValid باشد (فرم پر)
      // ولی اینجا ما چک isValid را نداریم؛
      // می‌توانید DevTools ببینید formData
      dispatch(nextStep());
    }, 200);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ثبت رویداد جدید</h1>
      <div className={styles.steps}>{renderStep()}</div>
      <div className={styles.navigation}>
        {currentStep > 1 && currentStep < 5 && (
          <Button
            text={"مرحله قبل"}
            label="مرحله قبل"
            onClick={handlePrev}
            variant="outline"
          />
        )}
        {currentStep < 5 && (
          <Button
            text={"مرحله بعد"}
            label="مرحله بعد"
            onClick={handleNext}
            variant="primary"
          />
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
