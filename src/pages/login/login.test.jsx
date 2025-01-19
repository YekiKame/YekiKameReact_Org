import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

// Mock the Button component
vi.mock('../../components/shared/button/button.jsx', () => ({
  __esModule: true,
  default: ({ text, ...props }) => <button {...props}>{text}</button>,
}));

// Mock the LoginModal component
vi.mock('../../components/modals/login/loginModal.jsx', () => ({
  __esModule: true,
  default: ({ onClose }) => (
    <div data-testid="modal">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    BrowserRouter: ({ children }) => <div>{children}</div>, // Mock BrowserRouter
  };
});

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.resetAllMocks();
    mockNavigate.mockClear();
  });

  it('renders the login form correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('شماره همراه')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('رمز عبور')).toBeInTheDocument();
    expect(screen.getByText('ورود')).toBeInTheDocument();
    expect(screen.getByText('ورود از طریق ارسال کد')).toBeInTheDocument();
  });

  it('validates the form fields and submittion', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('ورود'));

    expect(await screen.findByText('شماره همراه ضروری است.')).toBeInTheDocument();
    expect(await screen.findByText('رمز عبور ضروری است.')).toBeInTheDocument();
  });

// it('submits the form with valid data', async () => {
//   vi.useRealTimers(); // Ensure real timers are used

//   global.fetch = vi.fn(() => {
//     console.log('Mock fetch called');
//     return Promise.resolve({
//       json: () => {
//         console.log('Mock fetch resolved');
//         return Promise.resolve({
//           data: {
//             loginUser: { success: true, token: 'fake-token' },
//           },
//         });
//       },
//     });
//   });

//   render(
//     <BrowserRouter>
//       <Login />
//     </BrowserRouter>
//   );

//   await act(async () => {
//     console.log('Filling in phone number...');
//     fireEvent.change(screen.getByPlaceholderText('شماره همراه'), {
//       target: { value: '09123456789' },
//     });

//     console.log('Filling in password...');
//     fireEvent.change(screen.getByPlaceholderText('رمز عبور'), {
//       target: { value: 'password' },
//     });

//     console.log('Clicking login...');
//     fireEvent.click(screen.getByText('ورود'));
//   });

//   console.log('Waiting for success message...');
//   await waitFor(() => {
//     const message = screen.queryByText('ورود موفقیت‌آمیز بود!');
//     if (!message) {
//       console.error('Success message not found!');
//     }
//     expect(message).toBeInTheDocument();
//   });

//   console.log('Checking if mockNavigate was called:', mockNavigate.mock.calls);
//   await waitFor(() => {
//     expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
//   });
// }, 60000); // Extended timeout

  it('shows an error message for invalid credentials', async () => {
    vi.useRealTimers(); // Using real timers for debugging

    global.fetch = vi.fn(() => {
      console.log('Mock fetch called');
      return Promise.resolve({
        json: () => {
          console.log('Mock fetch resolved');
          return Promise.resolve({
            data: {
              loginUser: { success: false },
            },
          });
        },
      });
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    await act(async () => {
      console.log('Filling in phone number...');
      fireEvent.change(screen.getByPlaceholderText('شماره همراه'), {
        target: { value: '09123456789' },
      });

      console.log('Filling in password...');
      fireEvent.change(screen.getByPlaceholderText('رمز عبور'), {
        target: { value: 'wrongpassword' },
      });

      console.log('Clicking login...');
      fireEvent.click(screen.getByText('ورود'));
    });

    console.log('Waiting for error message...');
    await waitFor(() => {
      const message = screen.queryByText('شماره تلفن یا رمز عبور اشتباه است.');
      if (!message) {
        console.error('Error message not found!');
      }
      expect(message).toBeInTheDocument();
    });
  }, 60000); // Extended timeout

  it('opens and closes the modal', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('ورود از طریق ارسال کد'));
    });
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText('Close'));
    });
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
