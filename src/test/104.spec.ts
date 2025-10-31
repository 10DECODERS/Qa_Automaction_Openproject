import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginComponent from './LoginComponent';
import * as authService from '../services/authService';

describe('LoginComponent', () => {
  it('should successfully log in with valid credentials and trigger success callback', async () => {
    // Arrange
    const mockOnLoginSuccess = jest.fn();
    const mockLoginService = jest.spyOn(authService, 'login').mockResolvedValueOnce({
      token: 'mock-jwt-token',
      user: { id: 1, username: 'valid_user123!' }
    });

    render(<LoginComponent onLoginSuccess={mockOnLoginSuccess} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    const validUsername = 'valid_user123!';
    const validPassword = 'Pass@word123!';

    // Act
    fireEvent.change(usernameInput, { target: { value: validUsername } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });
    fireEvent.click(loginButton);

    // Assert
    await waitFor(() => {
      expect(mockLoginService).toHaveBeenCalledTimes(1);
      expect(mockLoginService).toHaveBeenCalledWith(validUsername, validPassword);
      expect(mockOnLoginSuccess).toHaveBeenCalledTimes(1);
    });

    mockLoginService.mockRestore();
  });
});