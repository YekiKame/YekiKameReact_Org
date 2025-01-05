import React from "react";
import { useDispatch } from "react-redux";
import { setStepIfValid } from "../../../redux/slices/createEventSlice";
import styles from "./stepper.module.css";
import firstStepIcon from "../../../assets/icons/firststep.svg";
import secondStepIcon from "../../../assets/icons/secondstep.svg";
import thirdStepIcon from "../../../assets/icons/thirdstep.svg";
import fourthStepIcon from "../../../assets/icons/fourthstep.svg";
import finalStepIcon from "../../../assets/icons/confirmstep.svg";

const Stepper = ({ currentStep }) => {
  const steps = [
    { label: "مشخصات پایه رویداد", icon: firstStepIcon },
    { label: "زمان‌بندی", icon: secondStepIcon },
    { label: "مکان و آدرس", icon: thirdStepIcon },
    { label: "جزئیات تکمیلی", icon: fourthStepIcon },
    { label: "تایید و ارسال", icon: finalStepIcon },
  ];

  const dispatch = useDispatch();

  const handleStepClick = (stepIndex) => {
    dispatch(setStepIfValid(stepIndex + 1));
  };

  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => (
        <div
          key={index}
          onClick={() => handleStepClick(index)} // افزودن کلیک
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
