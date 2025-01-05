import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextStep, prevStep } from "../../../redux/slices/createEventSlice.js";
import Step1 from "./steps/step1/step1.jsx";
import Step2 from "./steps/step2/step2.jsx";
import Step3 from "./steps/step3/step3.jsx";
import Step4 from "./steps/step4/step4.jsx";
import Step5 from "./steps/step5/step5.jsx";
import Button from "../../shared/button/button";
import styles from "./createevent.module.css";

const CreateEvent = () => {
  const currentStep = useSelector((state) => state.createEvent.currentStep);
  const dispatch = useDispatch();

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

  return (
    <div className={styles.container}>
      <h1 className={[styles.title]}>ثبت رویداد جدید</h1>
      <div className={styles.steps}>{renderStep()}</div>
      <div className={styles.navigation}>
        {currentStep > 1 && (
          <Button
            text={"مرحله قبل"}
            label="مرحله قبل"
            onClick={() => dispatch(prevStep())}
            variant="outline"
          />
        )}
        {currentStep < 5 && (
          <Button
            text={"مرحله بعد"}
            label="مرحله بعد"
            onClick={() => dispatch(nextStep())}
            variant="primary"
          />
        )}
        {
          // در مرحله 5 دیگر دکمه‌ای اینجا نداریم
        }
      </div>
    </div>
  );
};

export default CreateEvent;
