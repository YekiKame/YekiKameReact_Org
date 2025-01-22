import React from "react";
import { render, screen } from "@testing-library/react";
import TermsOfService from "./termsofService";

describe("TermsOfService Component", () => {
  test("renders the main title", () => {
    render(<TermsOfService />);
    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toHaveTextContent(/شرایط استفاده از خدمات/i);
  });

  test("renders the Acceptance section", () => {
    render(<TermsOfService />);
    const sectionHeading = screen.getByRole("heading", { level: 3, name: /پذیرش شرایط/i });
    expect(sectionHeading).toBeInTheDocument();
    expect(
      screen.getByText(
        /با استفاده از وب‌سایت یکی کمه، شما این شرایط و ضوابط را می‌پذیرید/i
      )
    ).toBeInTheDocument();
  });

  test("renders the Usage Conditions section", () => {
    render(<TermsOfService />);
    const sectionHeading = screen.getByRole("heading", { level: 3, name: /شرایط استفاده/i });
    expect(sectionHeading).toBeInTheDocument();
    expect(
      screen.getByText(/شما باید حداقل 13 سال سن داشته باشید/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/اطلاعات ارائه شده توسط شما باید دقیق و صحیح باشد/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/شما مسئول حفظ امنیت حساب کاربری خود هستید/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/استفاده نامناسب از پلتفرم ممکن است منجر به تعلیق حساب کاربری شود/i)
    ).toBeInTheDocument();
  });

  test("renders the Content and Events section", () => {
    render(<TermsOfService />);
    const sectionHeading = screen.getByRole("heading", { level: 3, name: /محتوا و رویدادها/i });
    expect(sectionHeading).toBeInTheDocument();
    expect(
      screen.getByText(/کاربران مسئول محتوا و رویدادهایی هستند که ایجاد می‌کنند/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/قانونی باشند/i)).toBeInTheDocument();
    expect(screen.getByText(/به حقوق دیگران احترام بگذارند/i)).toBeInTheDocument();
    expect(screen.getByText(/با قوانین محلی و ملی مطابقت داشته باشند/i)).toBeInTheDocument();
  });

  test("renders the Responsibilities section", () => {
    render(<TermsOfService />);
    const sectionHeading = screen.getByRole("heading", { level: 3, name: /مسئولیت‌ها/i });
    expect(sectionHeading).toBeInTheDocument();
    expect(screen.getByText(/یکی کمه مسئولیتی در قبال:/i)).toBeInTheDocument();
    expect(screen.getByText(/محتوای تولید شده توسط کاربران/i)).toBeInTheDocument();
    expect(screen.getByText(/رویدادهای برگزار شده توسط کاربران/i)).toBeInTheDocument();
    expect(screen.getByText(/اختلافات بین کاربران/i)).toBeInTheDocument();
    expect(screen.getByText(/خسارات ناشی از استفاده از پلتفرم/i)).toBeInTheDocument();
  });

  test("renders the Changes to Terms section", () => {
    render(<TermsOfService />);
    const sectionHeading = screen.getByRole("heading", { level: 3, name: /تغییرات در شرایط/i });
    expect(sectionHeading).toBeInTheDocument();
    expect(
      screen.getByText(/ما حق تغییر این شرایط را در هر زمان برای خود محفوظ می‌داریم/i)
    ).toBeInTheDocument();
  });
});
