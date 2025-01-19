import React from "react";
import { render, screen } from "@testing-library/react";
import PrivacyPolicy from "./privacyPolicy";

describe("PrivacyPolicy Component", () => {
  test("renders the main title", () => {
    render(<PrivacyPolicy />);
    // Target the main title (h1 element)
    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toHaveTextContent(/سیاست حفظ حریم خصوصی/i);
  });

  test("renders the Introduction section", () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/مقدمه/i)).toBeInTheDocument();
    expect(
      screen.getByText(/حفظ حریم خصوصی کاربران ما بسیار مهم است/i)
    ).toBeInTheDocument();
  });

  test("renders the Collected Information section", () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/اطلاعات جمع‌آوری شده/i)).toBeInTheDocument();
    expect(screen.getByText(/نام کاربری/i)).toBeInTheDocument();
    expect(screen.getByText(/آدرس ایمیل/i)).toBeInTheDocument();
    expect(
      screen.getByText(/اطلاعات رویدادهایی که ایجاد یا در آن‌ها شرکت می‌کنید/i)
    ).toBeInTheDocument();
  });

  test("renders the Usage Information section", () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/استفاده از اطلاعات/i)).toBeInTheDocument();
    expect(
      screen.getByText(/ارائه خدمات پلتفرم یکی کمه/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/بهبود تجربه کاربری/i)).toBeInTheDocument();
    expect(
      screen.getByText(/ارتباط با شما در مورد رویدادها/i)
    ).toBeInTheDocument();
  });

  test("renders the Security section", () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/امنیت اطلاعات/i)).toBeInTheDocument();
    expect(
      screen.getByText(/ما متعهد به حفاظت از اطلاعات شما هستیم/i)
    ).toBeInTheDocument();
  });

  test("renders the Contact section", () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/تماس با ما/i)).toBeInTheDocument();
    expect(screen.getByText(/support@yekikame.ir/i)).toBeInTheDocument();
  });
});
