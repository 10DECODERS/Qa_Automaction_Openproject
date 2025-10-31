import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For to-be-in-the-document matcher
import LoginPage from './LoginPage'; // Assuming LoginPage component is in './LoginPage.js'

describe('LoginPage', () => {
  it('should display username and password input fields, login button, and forgot password link', () => {
    // Arrange
    render(<LoginPage />);

    // Assert
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument();
  });
});