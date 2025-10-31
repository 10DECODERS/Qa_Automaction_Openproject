import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage'; // Adjust path as necessary

describe('LoginPage', () => {
  it('should display a "Login" button', () => {
    // Arrange
    render(<LoginPage />);

    // Act
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Assert
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeVisible();
  });
});