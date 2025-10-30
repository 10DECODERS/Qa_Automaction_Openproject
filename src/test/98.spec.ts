import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm'; // Assume LoginForm is imported from its path

const mockAuthService = {
  login: jest.fn(),
};

describe('LoginForm interaction', () => {
  const OLD_PASSWORD = 'oldPassword123';
  const USERNAME = 'testuser';
  const LOGIN_FAILURE_MESSAGE = 'Invalid username or password. Please try again.';

  it('should display an error when attempting to log in with an old password after reset', async () => {
    mockAuthService.login.mockRejectedValueOnce(new Error(LOGIN_FAILURE_MESSAGE));

    render(<LoginForm authService={mockAuthService} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /log in/i });

    await userEvent.type(usernameInput, USERNAME);
    await userEvent.type(passwordInput, OLD_PASSWORD);
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(LOGIN_FAILURE_MESSAGE)).toBeInTheDocument();
    });

    expect(mockAuthService.login).toHaveBeenCalledWith(USERNAME, OLD_PASSWORD);
  });
});