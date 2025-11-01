import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage'; // Assuming LoginPage is in the same directory

describe('LoginPage', () => {
  it('should display Username field, Password field, Login button, and Forgot Password link', () => {
    // Arrange
    render(<LoginPage />);

    // Assert
    // Username text field
    const usernameField = screen.getByRole('textbox', { name: /username/i });
    expect(usernameField).toBeInTheDocument();

    // Password password field
    const passwordField = screen.getByLabelText(/password/i);
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveAttribute('type', 'password');

    // Login button
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    // Forgot Password? link
    const forgotPasswordLink = screen.getByRole('link', { name: /forgot password\?/i });
    expect(forgotPasswordLink).toBeInTheDocument();
  });
});