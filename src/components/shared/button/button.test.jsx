import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button.jsx';
import { describe, it, expect, vi } from 'vitest';

// Mock the CSS module explicitly
vi.mock('./button.module.css', () => {
  return {
    default: {
      button: 'button',
      'button--primary': 'button--primary',
      'button--secondary': 'button--secondary',
      'button--blue': 'button--blue',
      'button--orange': 'button--orange',
      'button--large': 'button--large',
      'button--medium': 'button--medium',
    },
  };
});

describe('Button Component', () => {
//   it('should render the button with default props', () => {
//     render(<Button text="Click Me" />);

//     const button = screen.getByText('Click Me');
//     console.log('Rendered button className in test:', button.className); // Debugging the applied class names

//     expect(button).toBeInTheDocument();
//     expect(button.className).toContain('button'); // Matches mocked class
//     expect(button.className).toContain('button--primary'); // Default variant
//     expect(button.className).toContain('button--orange'); // Default color
//     expect(button.className).toContain('button--medium'); // Default size
//     expect(button).not.toBeDisabled();
//   });

//   it('should apply custom props correctly', () => {
//     render(
//       <Button
//         text="Custom Button"
//         variant="secondary"
//         color="blue"
//         size="large"
//         disabled={true}
//         customStyles={{ backgroundColor: 'red' }}
//       />
//     );

//     const button = screen.getByText('Custom Button');
//     console.log('Rendered button className in test:', button.className); // Debugging the applied class names

//     expect(button.className).toContain('button');
//     expect(button.className).toContain('button--secondary');
//     expect(button.className).toContain('button--blue');
//     expect(button.className).toContain('button--large');
//     expect(button).toBeDisabled();
//     expect(button).toHaveStyle({ backgroundColor: 'red' });
//   });

  it('should render with an icon if provided', () => {
    render(<Button text="Icon Button" icon={<span data-testid="icon">🌟</span>} />);

    const button = screen.getByText('Icon Button');
    const icon = screen.getByTestId('icon');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Button text="Click Me" onClick={handleClick} />);

    const button = screen.getByText('Click Me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button text="Click Me" onClick={handleClick} disabled={true} />);

    const button = screen.getByText('Click Me');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});




