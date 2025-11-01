frontendimport { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('should render all essential login page UI elements correctly', () => {
    // Arrange
    render(<LoginPage />);

    // Assert 'Username' text field
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument();

    // Assert 'Password' password field
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');

    // Assert 'Login' button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    // Assert 'Forgot Password?' link
    expect(screen.getByRole('link', { name: /forgot password\?/i })).toBeInTheDocument();
  });
});