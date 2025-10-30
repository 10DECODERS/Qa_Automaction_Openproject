import { render, screen } from '@testing-library/react';
import LoginPage from '../LoginPage'; // Adjust path as necessary

describe('LoginPage', () => {
  it('should display a standard text input field for username', () => {
    // Arrange
    render(<LoginPage />);

    // Act
    const usernameInput = screen.getByRole('textbox', { name: /username/i });

    // Assert
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute('type', 'text');
  });
});