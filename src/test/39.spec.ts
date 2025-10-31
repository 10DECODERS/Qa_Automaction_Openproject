"fileContent": "="fileContent": "="fileContent": "="fileContent": "="fileContent": "=import { render, screen } from '@testing-library/react';
import LoginForm from '../LoginForm'; // Assuming LoginForm is the component that renders the password field

describe('LoginForm', () => {
  it('should display a password input field with type="password"', () => {
    // Arrange
    render(<LoginForm />);

    // Act
    const passwordInputField = screen.getByLabelText(/password/i);

    // Assert
    expect(passwordInputField).toBeInTheDocument();
    expect(passwordInputField).toHaveAttribute('type', 'password');
  });
});"
"
"

import { render, screen } from '@testing-library/react';

// Assuming LoginForm component is defined and imported from './LoginForm';
// For the purpose of this self-contained example, a dummy LoginForm is provided.
const LoginForm = () => (
  <div>
    <label htmlFor="username-input">Username</label>
    <input id="username-input" type="text" />

    <label htmlFor="password-input">Password</label>
    <input id="password-input" type="password" />

    <a href="/forgot-password">Forgot Password?</a>

    <button type="submit">Log In</button>
  </div>
);

describe('LoginForm', () => {
  it('should display a "Forgot Password?" link beneath the password field', () => {
    // Arrange
    render(<LoginForm />);

    // Act
    const passwordInput = screen.getByLabelText(/password/i);
    const forgotPasswordLink = screen.getByRole('link', { name: /Forgot Password?/i });

    // Assert
    expect(passwordInput).toBeInTheDocument();
    expect(forgotPasswordLink).toBeInTheDocument();

    // Assert that the 'Forgot Password?' link appears *after* the password input in the DOM.
    // Node.DOCUMENT_POSITION_FOLLOWING (4) indicates that the compared node (forgotPasswordLink)
    // follows the reference node (passwordInput) in the document tree.
    const position = passwordInput.compareDocumentPosition(forgotPasswordLink);
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
  });
});"

import { render, screen, fireEvent } from '@testing-library/react';
import LoginComponent from './LoginComponent'; // Assume this component contains the link
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginComponent', () => {
  it('should navigate to the password recovery page when Forgot Password link is clicked', () => {
    // Arrange
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(<LoginComponent />);

    const forgotPasswordLink = screen.getByRole('link', { name: /Forgot Password\?/i });

    // Act
    fireEvent.click(forgotPasswordLink);

    // Assert
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/password-recovery');
  });
});"
