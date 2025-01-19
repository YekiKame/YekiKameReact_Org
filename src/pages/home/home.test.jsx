import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./home";

// Mocking imported components
vi.mock("../../components/events/herosection/heroSection.jsx", () => ({
  default: () => <div data-testid="hero-section">Hero Section</div>,
}));
vi.mock("../../components/pageComponents/main/eventSection/createEvent.jsx", () => ({
  default: () => <div data-testid="event-section">Event Section</div>,
}));
vi.mock("../../components/pageComponents/main/featureSection/featureSection.jsx", () => ({
  default: () => <div data-testid="feature-section">Feature Section</div>,
}));
vi.mock("../../components/pageComponents/main/FAQSection/faqSection.jsx", () => ({
  default: () => <div data-testid="faq-section">FAQ Section</div>,
}));
vi.mock("../../components/pageComponents/main/contactUsSection/contactForm.jsx", () => ({
  default: () => <div data-testid="contact-form">Contact Form</div>,
}));
vi.mock("../../components/pageComponents/main/latestevents/latestEvents.jsx", () => ({
  default: () => <div data-testid="latest-events">Latest Events</div>,
}));

describe("HomePage", () => {
  it("renders all sections correctly", () => {
    render(<HomePage />);

    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("latest-events")).toBeInTheDocument();
    expect(screen.getByTestId("event-section")).toBeInTheDocument();
    expect(screen.getByTestId("feature-section")).toBeInTheDocument();
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });
});
