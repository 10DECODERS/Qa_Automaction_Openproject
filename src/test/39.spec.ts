import { render, screen } from '@testing-library/react';
import LoginForm from '../LoginForm'; // Assuming LoginForm is the component that renders the password field

describe('LoginForm', () => {
  it('should display a password input field with type="password"', () => {
    // Arrange
    render(<LoginForm />);

    // Act
    const passwordInputField = screen.getByLabelText(/password/i);

    // Assert
    expect(passwordInputField).toBeInTheDocument();
    expect(passwordInputField).toHaveAttribute('type', 'password');
  });
});