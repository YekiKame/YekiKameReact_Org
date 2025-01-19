import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./signUp";
import axios from "axios";

// Mock the axios module
vi.mock("axios");

// Mock OTPModal component
vi.mock("../../components/modals/OTPModal/otpModal.jsx", () => {
  return {
    __esModule: true,
    default: ({ isOpen, onClose, onSubmit }) => {
      console.log("OTPModal rendered with isOpen:", isOpen); // Debugging log
      return isOpen ? (
        <div data-testid="otp-modal">
          <p>OTP Modal Opened</p>
          <button onClick={() => onSubmit("123456")}>Submit</button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null;
    },
  };
});

describe("SignUp Component", () => {
  const renderWithRouter = (component) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it("renders the sign-up form correctly", () => {
    renderWithRouter(<SignUp />);
    expect(screen.getByPlaceholderText("شماره همراه")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("رمز عبور")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("تکرار رمز عبور")).toBeInTheDocument();
    expect(screen.getByText("تأیید و دریافت کد")).toBeInTheDocument();
  });

  it("validates form inputs correctly", async () => {
    renderWithRouter(<SignUp />);
    fireEvent.click(screen.getByText("تأیید و دریافت کد"));
    await waitFor(() => {
      expect(
        screen.getByText("شماره تلفن ضروری است.")
      ).toBeInTheDocument();
      expect(screen.getByText("رمز عبور ضروری است.")).toBeInTheDocument();
    });
  });

  it("shows an error for invalid phone number", async () => {
    renderWithRouter(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("شماره همراه"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("رمز عبور"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByPlaceholderText("تکرار رمز عبور"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("تأیید و دریافت کد"));
    await waitFor(() => {
      expect(
        screen.getByText("شماره تلفن باید معتبر باشد.")
      ).toBeInTheDocument();
    });
  });

  it("handles successful signup submission and opens OTP modal", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        data: {
          registerUser: {
            success: true,
          },
        },
      },
    });

    renderWithRouter(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("شماره همراه"), {
      target: { value: "09123456789" },
    });
    fireEvent.change(screen.getByPlaceholderText("رمز عبور"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByPlaceholderText("تکرار رمز عبور"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("تأیید و دریافت کد"));

    // Wait for the modal to open
    await waitFor(() => {
      expect(screen.getByTestId("otp-modal")).toBeInTheDocument();
      expect(screen.getByText("OTP Modal Opened")).toBeInTheDocument();
    });
  });

//   it("handles OTP submission correctly", async () => {
//     // Mock API response for OTP verification
//     axios.post.mockResolvedValueOnce({
//       data: {
//         data: {
//           verifyOtp: {
//             success: true,
//             token: "sample-token",
//           },
//         },
//       },
//     });

//     renderWithRouter(<SignUp />);

//     // Simulate user input for sign-up
//     fireEvent.change(screen.getByPlaceholderText("شماره همراه"), {
//       target: { value: "09123456789" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("رمز عبور"), {
//       target: { value: "password" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("تکرار رمز عبور"), {
//       target: { value: "password" },
//     });
//     fireEvent.click(screen.getByText("تأیید و دریافت کد"));

//     // Wait for the modal to open
//     await waitFor(() => {
//       expect(screen.getByTestId("otp-modal")).toBeInTheDocument();
//       expect(screen.getByText("OTP Modal Opened")).toBeInTheDocument();
//     });

//     // Simulate OTP submission
//     fireEvent.click(screen.getByText("Submit"));

//     // Verify successful submission message
//     await waitFor(() => {
//       expect(
//         screen.getByText("ثبت نام شما با موفقیت انجام شد!")
//       ).toBeInTheDocument();
//     });
//   });
});
