import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage'; // Assuming LoginPage is the component under test

describe('LoginPage', () => {
  it('should display a Username input field', () => {
    // Arrange
    render(<LoginPage />);

    // Act & Assert
    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    expect(usernameInput).toBeInTheDocument();
  });
});