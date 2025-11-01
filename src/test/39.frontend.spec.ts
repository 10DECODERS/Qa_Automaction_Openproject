frontendimport { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import '@testing-library/jest-dom';

describe('LoginPage UI Elements', () => {
  it('should correctly display Username and Password fields, Login button, and Forgot Password link', () => {
    // Arrange
    render(<LoginPage />);

    // Assert
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /forgot password\?/i })).toBeInTheDocument();
  });
});