import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LoginForm from './LoginForm';

jest.mock('axios');

describe('LoginForm', () => {
  it('should display error when login fails with 8-character password', async () => {
    const usernameInput = 'validuser';
    const passwordInput = 'password';
    const errorMessage = 'Invalid username or password. Please try again.';

    axios.post.mockRejectedValueOnce({
      response: {
        status: 401,
        data: { message: errorMessage },
      },
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: usernameInput } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: passwordInput } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
    });
    expect(axios.post).toHaveBeenCalledWith('/api/login', { username: usernameInput, password: passwordInput });
  });
});