import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import FeaturesSection from "./featureSection";

// Mocking the useNavigate hook
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mocking window.scrollTo
global.scrollTo = vi.fn();

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("FeaturesSection Component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  test("renders FeaturesSection correctly", () => {
    renderWithRouter(<FeaturesSection />);
    expect(screen.getByText(/ویژگی‌های یکی کمه/i)).toBeInTheDocument();
    expect(
      screen.getByText(/ما تمام سعی خود را می‌کنیم تا بهترین خدمات را به مشتریان ارائه دهیم/i)
    ).toBeInTheDocument();
  });

  test("renders all feature cards with correct content", () => {
    renderWithRouter(<FeaturesSection />);

    // Check titles and descriptions for each card
    const featureCards = [
      {
        title: "پیدا کردن افراد مناسب در کمترین زمان",
        description:
          "در چند دقیقه، افراد مورد نظر برای رویدادت را پیدا کن و وقتت را کامل کن! نیازی به جستجوی طولانی نیست، ما اینجا هستیم تا کار را برایت ساده کنیم.",
      },
      {
        title: "ارتباط آسان و مستقیم با شرکت‌کنندگان",
        description:
          "با ابزارهای ارتباطی می‌توانی به راحتی با اعضای تیم و شرکت‌کنندگان گفتگو کنی و هماهنگی‌ها را انجام دهی.",
      },
      {
        title: "مناسب برای هر نوع رویداد",
        description:
          "چه به دنبال یک تیم فوتبال باشی، چه گروه مطالعه، یا هر چیز دیگر، 'یکی کمه' با امکانات متنوع خود در خدمت توست.",
      },
      {
        title: "کاملاً رایگان و بدون پیچیدگی",
        description:
          "رویدادت را بدون هیچ هزینه‌ای ایجاد کن و از امکانات ساده و کاربردی ما استفاده کن.",
      },
    ];

    featureCards.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
      expect(screen.getByText(card.description)).toBeInTheDocument();
    });
  });

  test("navigates to /aboutus and scrolls to the top when 'مشاهده بیشتر' is clicked", () => {
    renderWithRouter(<FeaturesSection />);

    const moreButton = screen.getByText(/مشاهده بیشتر/i);
    fireEvent.click(moreButton);

    expect(mockNavigate).toHaveBeenCalledWith("/aboutus");
    expect(global.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
