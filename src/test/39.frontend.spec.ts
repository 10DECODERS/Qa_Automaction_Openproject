import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import loginService from './loginService';

jest.mock('./loginService');

describe('LoginForm', () => {
  it('should display error for password missing numeric digit', async () => {
    const username = 'testuser';
    const password = 'PasswordNoDigit!';

    loginService.login.mockRejectedValueOnce({
      response: {
        status: 401,
        data: { message: 'Password must contain at least one digit.' }
      }
    });

    render(<LoginForm />);

    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');

    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId('login-error-message')).toHaveTextContent('Invalid username or password. Please try again.');
    });
    expect(loginService.login).toHaveBeenCalledWith(username, password);
  });
});