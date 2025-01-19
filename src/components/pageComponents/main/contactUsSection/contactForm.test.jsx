import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ContactUs from "./contactForm";
import axios from "axios";

vi.mock("axios");

describe("ContactUs Component", () => {
  it("renders the ContactUs form", () => {
    render(<ContactUs />);

    expect(screen.getByText(/تماس با ما/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/کوروش همایونی/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/persian@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/سوال در مورد رویداد ورزشی/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/پیام‌های خود را در اینجا بنویسید/i)).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<ContactUs />);

    const submitButton = screen.getByRole("button", { name: /ثبت/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/نام و نام خانوادگی ضروری است\./i)).toBeInTheDocument();
    expect(await screen.findByText(/ایمیل ضروری است\./i)).toBeInTheDocument();
    expect(await screen.findByText(/عنوان ضروری است\./i)).toBeInTheDocument();
    expect(await screen.findByText(/پیام ضروری است\./i)).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        data: {
          createContactUs: {
            contact: {
              fullName: "Test User",
              email: "test@example.com",
              subject: "Test Subject",
              message: "Test Message",
              createdAt: "2025-01-16",
            },
          },
        },
      },
    });

    render(<ContactUs />);

    const fullNameInput = screen.getByPlaceholderText(/کوروش همایونی/i);
    const emailInput = screen.getByPlaceholderText(/persian@gmail.com/i);
    const subjectInput = screen.getByPlaceholderText(/سوال در مورد رویداد ورزشی/i);
    const messageInput = screen.getByPlaceholderText(/پیام‌های خود را در اینجا بنویسید/i);
    const submitButton = screen.getByRole("button", { name: /ثبت/i });

    await userEvent.type(fullNameInput, "Test User");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(subjectInput, "Test Subject");
    await userEvent.type(messageInput, "Test Message");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/پیام شما با موفقیت ارسال شد!/i)).toBeInTheDocument();
    });
  });

  it("handles server errors gracefully", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(<ContactUs />);

    const fullNameInput = screen.getByPlaceholderText(/کوروش همایونی/i);
    const emailInput = screen.getByPlaceholderText(/persian@gmail.com/i);
    const subjectInput = screen.getByPlaceholderText(/سوال در مورد رویداد ورزشی/i);
    const messageInput = screen.getByPlaceholderText(/پیام‌های خود را در اینجا بنویسید/i);
    const submitButton = screen.getByRole("button", { name: /ثبت/i });

    await userEvent.type(fullNameInput, "Test User");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(subjectInput, "Test Subject");
    await userEvent.type(messageInput, "Test Message");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/خطایی در ارتباط با سرور رخ داده است\./i)).toBeInTheDocument();
    });
  });
});
