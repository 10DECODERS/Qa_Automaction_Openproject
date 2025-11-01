import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import * as authService from '../services/authService';

describe('Login Component', () => {
  it('should display error for password less than 8 characters', async () => {
    jest.spyOn(authService, 'login').mockRejectedValue(new Error('Backend rejected credentials'));

    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password. Please try again.')).toBeInTheDocument();
    });
    expect(authService.login).toHaveBeenCalledWith('testuser', 'short');
  });
});