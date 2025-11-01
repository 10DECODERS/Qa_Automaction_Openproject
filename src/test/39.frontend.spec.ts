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

// ========================================
// Test Case Added: Login fails with password missing uppercase letter
// Generated: 2025-11-01T09:18:49.047Z


// ========================================

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('should display an error message when login fails due to missing uppercase in password', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ message: 'Invalid username or password. Please try again.' }),
      })
    );

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password. Please try again.')).toBeInTheDocument();
    });

    global.fetch.mockRestore();
  });
});

// ========================================
// Test Case Added: Login fails with password missing lowercase letter
// Generated: 2025-11-01T09:23:32.722Z


// ========================================

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
global.fetch = jest.fn();
describe('Login Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it('should display error when login fails due to password missing lowercase', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'Invalid username or password. Please try again.' }), { status: 401 });
    render(<Login />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'PASSWORD123!' } });
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(screen.getByText('Invalid username or password. Please try again.')).toBeInTheDocument();
    });
  });
});