import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';
import axios from 'axios';

jest.mock('axios');

describe('LoginForm', () => {
  it('should display error when password misses special character', async () => {
    const mockErrorMessage = 'Invalid username or password. Please try again.';
    axios.post.mockRejectedValueOnce({
      response: {
        data: { message: mockErrorMessage },
        status: 401
      }
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Validpassword123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
    });
  });
});

// ========================================
// Test Case Added: Display error message for non-existent username
// Generated: 2025-11-01T09:45:07.555Z


// ========================================

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: 'Invalid username or password. Please try again.' }),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should display an error message for a non-existent username', async () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /log in/i });

    await userEvent.type(usernameInput, 'nonexistentuser');
    await userEvent.type(passwordInput, 'validpassword123');
    await userEvent.click(submitButton);

    const errorMessage = await screen.findByText('Invalid username or password. Please try again.');
    expect(errorMessage).toBeInTheDocument();
  });
});