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