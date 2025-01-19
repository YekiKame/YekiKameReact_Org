import React from "react";
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { vi } from 'vitest';
import UserDropdown from './UserDropdown';
import { useNavigate, useLocation } from 'react-router-dom';

// Mock react-router-dom hooks
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

describe('UserDropdown Component', () => {
  const mockOnClose = vi.fn();

  // Mock sessionStorage methods before each test
  beforeEach(() => {
    // Create spies for sessionStorage methods
    global.sessionStorage = {
      removeItem: vi.fn(),
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    };

    vi.spyOn(window, 'location', 'get').mockReturnValue({ reload: vi.fn() });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders the UserDropdown correctly', () => {
    render(<UserDropdown onClose={mockOnClose} />);
    
    expect(screen.getByText('پنل کاربری')).toBeInTheDocument();
    expect(screen.getByText('ثبت رویداد')).toBeInTheDocument();
    expect(screen.getByText('خروج')).toBeInTheDocument();
  });

  it('navigates to dashboard when "پنل کاربری" is clicked', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ pathname: '/home' });

    render(<UserDropdown onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByText('پنل کاربری'));
    
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('navigates to dashboard with "createEvent" state when "ثبت رویداد" is clicked', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ pathname: '/home' });

    render(<UserDropdown onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByText('ثبت رویداد'));
    
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { state: { activeTab: 'createEvent' } });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('logs out and redirects to login when "خروج" is clicked from /dashboard', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ pathname: '/dashboard' });
    
    render(<UserDropdown onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByText('خروج'));
    
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('sessionToken');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('userPhone');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('isLoggedIn');
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('logs out without redirect when not on /dashboard', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ pathname: '/home' });
    
    render(<UserDropdown onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByText('خروج'));
    
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('sessionToken');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('userPhone');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('isLoggedIn');
    expect(window.location.reload).toHaveBeenCalled();
  });
});

