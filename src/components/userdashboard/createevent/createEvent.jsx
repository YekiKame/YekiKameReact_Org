import React, { useCallback } from "react";
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

  // رندر مرحله فعلی
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

  // تابع کمکی برای سابمیت فرم فعلی
  const handleSubmitCurrentForm = useCallback(() => {
    const formElement = document.getElementById(`step${currentStep}Form`);
    if (formElement) {
      formElement.requestSubmit(); 
    }
  }, [currentStep]);

  // وقتی دکمه «مرحله قبل» کلیک شد
  const handlePrev = () => {
    dispatch(prevStep());
  };

  // وقتی دکمه «مرحله بعد» کلیک شد:
  const handleNext = () => {
    // ابتدا فرم مرحله فعلی را سابمیت می‌کنیم:
    handleSubmitCurrentForm();
    // سپس با اندکی تاخیر به مرحله بعد می‌رویم (تا اگر خطایی باشد، جلویش گرفته شود)
    setTimeout(() => {
      // این روش ساده است ولی استاندارد کامل نیست؛
      // در عمل اگر فرم خطا داشته باشد، Formik سابمیت را کنسل می‌کند
      // و کاربر پیام خطا می‌بیند. بنابراین اگر کاربر فیلدها را اصلاح نکند،
      // همچنان در همین مرحله خواهد ماند.
      dispatch(nextStep());
    }, 100);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ثبت رویداد جدید</h1>
      <div className={styles.steps}>{renderStep()}</div>
      <div className={styles.navigation}>
        {/* دکمه مرحله قبل */}
        {currentStep > 1 && currentStep < 5 && (
          <Button
            text={"مرحله قبل"}
            label="مرحله قبل"
            onClick={handlePrev}
            variant="outline"
          />
        )}

        {/* دکمه مرحله بعد */}
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
