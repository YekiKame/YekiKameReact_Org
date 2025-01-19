import React from 'react';
import { render, screen } from "@testing-library/react";
import Footer from "./footer";

describe("Footer Component", () => {
  test("renders the footer component", () => {
    render(<Footer />);
    
    // Check for the presence of the brand logo text
    expect(screen.getByText("یکی کمه")).toBeInTheDocument();

    // Check for the description text
    expect(
      screen.getByText(/یکی کمه، با هدف ساده‌تر کردن ایجاد و مدیریت رویدادها طراحی شده است/)
    ).toBeInTheDocument();

    // Check for social media icons
    const samandehiLogo = screen.getByAltText("ساماندهی");
    const telegramIcon = screen.getByAltText("تلگرام");
    const instagramIcon = screen.getByAltText("اینستاگرام");
    const twitterIcon = screen.getByAltText("توییتر");

    expect(samandehiLogo).toBeInTheDocument();
    expect(telegramIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByText("صفحه اصلی")).toBeInTheDocument();
    expect(screen.getByText("رویدادها")).toBeInTheDocument();
    expect(screen.getByText("درباره ما")).toBeInTheDocument();
  });

  test("contains valid links for social media and navigation", () => {
    render(<Footer />);
    
    // Social media links
    expect(screen.getByAltText("ساماندهی").closest("a")).toHaveAttribute(
      "href",
      "https://www.samandehi.ir"
    );
    expect(screen.getByAltText("تلگرام").closest("a")).toHaveAttribute(
      "href",
      "https://t.me/"
    );
    expect(screen.getByAltText("اینستاگرام").closest("a")).toHaveAttribute(
      "href",
      "https://instagram.com/"
    );
    expect(screen.getByAltText("توییتر").closest("a")).toHaveAttribute(
      "href",
      "https://twitter.com/"
    );

    // Navigation links
    expect(screen.getByText("صفحه اصلی").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("رویدادها").closest("a")).toHaveAttribute("href", "/events");
    expect(screen.getByText("درباره ما").closest("a")).toHaveAttribute("href", "/about");
  });
});
