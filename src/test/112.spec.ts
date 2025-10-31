import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage'; // Adjust the import path as needed

describe('LoginPage', () => {
  it('should display a password input field', () => {
    // Arrange
    render(<LoginPage />);

    // Act
    const passwordInputField = screen.getByLabelText(/password/i);

    // Assert
    expect(passwordInputField).toBeInTheDocument();
    expect(passwordInputField).toHaveAttribute('type', 'password');
  });
});