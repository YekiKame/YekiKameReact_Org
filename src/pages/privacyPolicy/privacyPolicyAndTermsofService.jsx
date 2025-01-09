import React from "react";
import styles from "./privacypolicyandtermsofservice.module.css";
import PrivacyPolicy from "./privacyPolicy";
import TermsOfService from "./termsofService";
const PrivacyPolicyAndTermsofService = () => {
  return (
    <div className={styles["container"]}>
      <PrivacyPolicy />
      <TermsOfService />
    </div>
  );
};

export default PrivacyPolicyAndTermsofService;
