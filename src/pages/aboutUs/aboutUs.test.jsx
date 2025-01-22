import React from "react";
import { render, screen } from '@testing-library/react';
import AboutUs from './aboutUs.jsx'; // Adjust the path as needed
import { describe, it, expect } from 'vitest';

describe('AboutUs Component', () => {
  it('should render the AboutUs component correctly', () => {
    render(<AboutUs />);

    // Check if the introduction text is rendered
    expect(screen.getByText(/درباره ما/i)).toBeInTheDocument();
    expect(screen.getByText(/در دنیای امروز، برقراری ارتباط و ایجاد تعاملات اجتماعی با دیگران/i)).toBeInTheDocument();

    // Check if the features section is rendered
    expect(screen.getByText(/ویژگی‌های یکی کمه/i)).toBeInTheDocument();
    expect(screen.getByText(/پیدا کردن افراد مناسب در کمترین زمان/i)).toBeInTheDocument();
    expect(screen.getByText(/ارتباط آسان و مستقیم با شرکت‌کنندگان/i)).toBeInTheDocument();

    // Check if the team section is rendered
    expect(screen.getByText(/تیم ما/i)).toBeInTheDocument();
    expect(screen.getByText(/امیرحسین امین مقدم/i)).toBeInTheDocument();

    // Check if images are loaded (using alt text)
    expect(screen.getByAltText('YekiKame banner')).toBeInTheDocument();
    expect(screen.getByAltText('Feature 1')).toBeInTheDocument();
    expect(screen.getByAltText('Feature 2')).toBeInTheDocument();
    expect(screen.getByAltText('Feature 3')).toBeInTheDocument();
    expect(screen.getByAltText('Feature 4')).toBeInTheDocument();
    expect(screen.getByAltText('Member 1')).toBeInTheDocument();
    expect(screen.getByAltText('Member 2')).toBeInTheDocument();
    expect(screen.getByAltText('Member 3')).toBeInTheDocument();
    expect(screen.getByAltText('Member 4')).toBeInTheDocument();
  });
});
