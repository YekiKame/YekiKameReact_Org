import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStepIfValid } from "../../../redux/slices/createEventSlice";
import styles from "./stepper.module.css";

import firstStepIcon from "../../../assets/icons/firststep.svg";
import secondStepIcon from "../../../assets/icons/secondstep.svg";
import thirdStepIcon from "../../../assets/icons/thirdstep.svg";
import fourthStepIcon from "../../../assets/icons/fourthstep.svg";
import finalStepIcon from "../../../assets/icons/confirmstep.svg";

const Stepper = ({ currentStep }) => {
  const dispatch = useDispatch();

  const steps = [
    { label: "مشخصات پایه رویداد", icon: firstStepIcon },
    { label: "زمان‌بندی", icon: secondStepIcon },
    { label: "مکان و آدرس", icon: thirdStepIcon },
    { label: "جزئیات تکمیلی", icon: fourthStepIcon },
    { label: "تایید و ارسال", icon: finalStepIcon },
  ];

  const handleStepClick = (stepIndex) => {
    const desiredStep = stepIndex + 1;
    // اگر مرحله مورد نظر از currentStep بزرگ‌تر باشد، اجازه نمی‌دهیم.
    if (desiredStep > currentStep) {
      console.log("Cannot jump forward directly!");
      return;
    }
    // اگر برابر یا عقب‌تر باشد:
    dispatch(setStepIfValid(desiredStep));
  };

  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => (
        <div
          key={index}
          onClick={() => handleStepClick(index)}
          className={`${styles.step} ${
            index + 1 === currentStep ? styles.active : ""
          }`}
        >
          <img src={step.icon} alt={step.label} className={styles.icon} />
          <span className={styles.label}>{step.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
