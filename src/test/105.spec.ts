import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react'; // Required for JSX in the mock component
// In a real test, you would import your actual LoginForm component
// import LoginForm from './LoginForm'; 

// Minimal mock LoginForm for demonstration purposes
// In a real scenario, you would import your actual component
const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real component, client-side validation would happen here.
    // For this test, we assume valid inputs will pass.
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

describe('LoginForm', () => {
  it('should call onSubmit with valid credentials upon successful submission', () => {
    // Arrange
    const mockOnSubmit = jest.fn();
    const validUsername = 'UserLogin123!@#'; // > 8 chars, alphabets, numbers, special
    const validPassword = 'MySecurePassword123!@#'; // > 8 chars, U, L, N, S

    render(<LoginForm onSubmit={mockOnSubmit} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // Act
    fireEvent.change(usernameInput, { target: { value: validUsername } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });
    fireEvent.click(submitButton);

    // Assert
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(validUsername, validPassword);
  });
});