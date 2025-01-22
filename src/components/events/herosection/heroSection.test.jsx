import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import HeroSection from "./heroSection";

// Mocking the useNavigate hook
const mockNavigate = vi.fn(); // Create a mock function
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate, // Return the mocked navigate function
  };
});

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("HeroSection Component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  test("renders HeroSection component correctly", () => {
    renderWithRouter(<HeroSection />);
    expect(screen.getByText(/فقط یکی کمه/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/جستجوی شهر/i)).toBeInTheDocument();
    expect(screen.getByText(/شهرهای پربازدید/i)).toBeInTheDocument();
  });

  test("displays default popular cities", () => {
    renderWithRouter(<HeroSection />);
    const popularCities = ["اصفهان", "شیراز", "کرج", "مشهد", "تهران"];
    popularCities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  test("filters cities based on search input", async () => {
    renderWithRouter(<HeroSection />);
    const searchInput = screen.getByPlaceholderText(/جستجوی شهر/i);

    // Simulating user input
    fireEvent.change(searchInput, { target: { value: "ته" } });

    await waitFor(() => {
      expect(screen.getByDisplayValue("ته")).toBeInTheDocument();
    });
  });

  test("navigates to event list on city button click", () => {
    renderWithRouter(<HeroSection />);
    const cityButton = screen.getByText("تهران");

    fireEvent.click(cityButton);

    expect(mockNavigate).toHaveBeenCalledWith("/eventList/%D8%AA%D9%87%D8%B1%D8%A7%D9%86");
  });

  test("navigates to event list on search form submit", () => {
    renderWithRouter(<HeroSection />);
    const searchInput = screen.getByPlaceholderText(/جستجوی شهر/i);
    const searchForm = searchInput.closest("form");

    fireEvent.change(searchInput, { target: { value: "اصفهان" } });
    fireEvent.submit(searchForm);

    expect(mockNavigate).toHaveBeenCalledWith("/eventList/%D8%A7%D8%B5%D9%81%D9%87%D8%A7%D9%86");
  });

  test("displays an empty datalist when search input is empty", async () => {
    renderWithRouter(<HeroSection />);
    const searchInput = screen.getByPlaceholderText(/جستجوی شهر/i);

    fireEvent.change(searchInput, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/جستجوی شهر/i)).toHaveValue("");
    });
  });
});
