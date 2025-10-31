import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login'; // Assuming 'Login' is the component under test

describe('Login Component', () => {
  it('should call the onSubmit prop with valid credentials and not display an error', async () => {
    // Arrange
    const mockOnSubmit = jest.fn(() => Promise.resolve()); // Mock a successful login operation
    const validUsername = 'TestUser_123!@domain'; // More than 8 characters, alpha, num, special
    const validPassword = 'SecureP@ssw0rd!';   // More than 8, uppercase, lowercase, numeric, special

    render(<Login onSubmit={mockOnSubmit} />);

    const usernameInput = screen.getByLabelText(/username/i); // Assuming an accessible label for the input
    const passwordInput = screen.getByLabelText(/password/i); // Assuming an accessible label for the input
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Act
    fireEvent.change(usernameInput, { target: { value: validUsername } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });
    fireEvent.click(loginButton);

    // Assert
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
    expect(mockOnSubmit).toHaveBeenCalledWith(validUsername, validPassword);
    // Optionally, assert that no error message is visible if the component displays them
    expect(screen.queryByTestId('login-error-message')).not.toBeInTheDocument();
  });
});