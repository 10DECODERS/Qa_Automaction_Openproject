import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Login from './Login'; // Assuming Login component is in Login.js or Login.jsx

describe('Login Component', () => {
  it('should call onLogin with valid credentials upon successful submission', () => {
    // Arrange
    const mockOnLogin = jest.fn();
    const validUsername = 'ValidUser123!@#';
    const validPassword = 'P@ssw0rdStrong1';

    render(<Login onLogin={mockOnLogin} />);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    // Act
    fireEvent.change(usernameInput, { target: { value: validUsername } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });
    fireEvent.click(loginButton);

    // Assert
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnLogin).toHaveBeenCalledWith(validUsername, validPassword);
  });
});