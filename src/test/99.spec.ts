import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage'; // Assuming LoginPage is the component being tested

describe('LoginPage', () => {
  it('should display a username input field of type text', () => {
    // Arrange
    render(<LoginPage />);

    // Act
    const usernameInput = screen.getByLabelText(/username/i);

    // Assert
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute('type', 'text');
  });
});