import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import UserDashboard from "./userDashboard";
import { vi } from "vitest";

// Mocking axios
vi.mock("axios");

// Mocking react-router-dom
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("UserDashboard", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("renders UserDashboard component correctly", () => {
    renderWithRouter(<UserDashboard />);
    const title = screen.getByText(/ویرایش اطلاعات/i);
    expect(title).toBeInTheDocument();
  });

  test("displays 'کاربر ناشناس' if no phone number is stored", () => {
    renderWithRouter(<UserDashboard />);
    const anonymousText = screen.getByText(/کاربر ناشناس/i);
    expect(anonymousText).toBeInTheDocument();
  });

  test("fetches and displays username when phone number is stored", async () => {
    sessionStorage.setItem("userPhone", "1234567890");

    axios.post.mockResolvedValueOnce({
      data: {
        data: {
          user: {
            fullname: "John Doe",
          },
        },
      },
    });

    renderWithRouter(<UserDashboard />);

    const userNameInput = await screen.findByDisplayValue("John Doe");
    expect(userNameInput).toBeInTheDocument();
  });

  test("displays error message if username fetch fails", async () => {
    sessionStorage.setItem("userPhone", "1234567890");

    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    renderWithRouter(<UserDashboard />);

    const errorMessage = await screen.findByText(/خطا در واکشی نام کاربر/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("switches tabs when menu items are clicked", () => {
    renderWithRouter(<UserDashboard />);

    const myEventsTab = screen.getByText(/رویدادهای من/i);
    fireEvent.click(myEventsTab);

    expect(myEventsTab.parentElement).toHaveClass("_active_e2ed24");
  });

//   test("logs out the user and redirects to login page", () => {
//     const mockNavigate = vi.fn();
//     const { useNavigate } = require("react-router-dom");
//     useNavigate.mockReturnValue(mockNavigate);

//     renderWithRouter(<UserDashboard />);

//     const logoutButton = screen.getByText(/خروج/i);
//     fireEvent.click(logoutButton);

//     expect(sessionStorage.getItem("userPhone")).toBeNull();
//     expect(sessionStorage.getItem("sessionToken")).toBeNull();
//     expect(mockNavigate).toHaveBeenCalledWith("/login");
//   });
});
