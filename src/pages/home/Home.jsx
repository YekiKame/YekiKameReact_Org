import React from "react";

import HeroSection from "../../components/events/herosection/HeroSection";
import EventSection from "../../components/pageComponents/main/eventSection/createEvent";
import FeatureSection from "../../components/pageComponents/main/featureSection/featureSection";
import FAQSection from "../../components/pageComponents/main/FAQSection/FAQSection";
import ContactForm from "../../components/pageComponents/main/contactUsSection/ContactForm";
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <EventSection />
      <FeatureSection />
      <FAQSection />
      <ContactForm />
    </div>
  );
};

export default HomePage;
