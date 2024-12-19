import React from "react";
import HeroSection from "../../components/events/herosection/HeroSection";
import EventSection from "../../components/pageComponents/main/eventSection/createEvent";
import FeatureSection from "../../components/pageComponents/main/featureSection/featureSection";
import  LatestEvents  from "../../components/pageComponents/main/recentEvents/LatestEvents";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <LatestEvents/>
      <EventSection />
      <FeatureSection />
    </div>
  );
};

export default HomePage;
