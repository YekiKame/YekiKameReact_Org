import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom'; // Import useNavigate
import Notfound from './notFound.jsx'; // Adjust the path as needed
import { describe, it, expect, vi } from 'vitest';

// Mock useNavigate from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(), // Mock the useNavigate function
  };
});

describe('Notfound Component', () => {
  it('should render the Notfound component correctly and handle navigation', () => {
    const navigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate); // Set mocked return value

    render(
      <MemoryRouter>
        <Notfound />
      </MemoryRouter>
    );

    // Check if the error image is rendered
    expect(screen.getByAltText('Error404')).toBeInTheDocument();

    // Check if the error message is rendered
    expect(screen.getByText("متأسفیم.صفحه مورد نظر شما یا جستجوی شما یافت نشد.")).toBeInTheDocument();

    // Check if the button is rendered
    const button = screen.getByText("بازگشت به صفحه اصلی");
    expect(button).toBeInTheDocument();

    // Simulate button click and check if navigate was called
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith('/');
  });
});


