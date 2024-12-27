import React from "react";

import HeroSection from "../../components/events/herosection/heroSection.jsx";
import EventSection from "../../components/pageComponents/main/eventSection/createEvent.jsx";
import FeatureSection from "../../components/pageComponents/main/featureSection/featureSection.jsx";
import FAQSection from "../../components/pageComponents/main/FAQSection/faqSection.jsx";
import ContactForm from "../../components/pageComponents/main/contactUsSection/contactForm.jsx";
import LatestEvents from "../../components/pageComponents/main/latestevents/latestEvents.jsx";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <LatestEvents />
      <EventSection />
      <FeatureSection />
      <FAQSection />
      <ContactForm />
    </div>
  );
};

export default HomePage;
