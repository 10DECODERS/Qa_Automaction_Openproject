import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

global.fetch = jest.fn((url, options) => {
  if (url === '/api/login' && options.method === 'POST') {
    const { username } = JSON.parse(options.body);
    if (username.length === 8) {
      return Promise.resolve({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ message: 'Invalid username or password. Please try again.' }),
      });
    }
    return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ token: 'mock_token' }) });
  }
  return Promise.reject(new Error('unhandled fetch'));
});

describe('Login Component', () => {
  it('should display an error message when username is exactly 8 characters long', async () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'user1234' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password. Please try again.')).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/login',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ username: 'user1234', password: 'password123' }),
      })
    );
  });
});