import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import HeroSection from "../../components/events/herosection/HeroSection";
import EventSection from "../../components/pageComponents/main/eventSection/createEvent";
import FeatureSection from "../../components/pageComponents/main/featureSection/featureSection";
import FAQSection from "../../components/pageComponents/main/FAQSection/FAQSection";



const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <EventSection />
      <FeatureSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;
