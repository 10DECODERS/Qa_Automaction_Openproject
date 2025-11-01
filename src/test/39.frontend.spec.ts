import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const PasswordInput = ({ label, id }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input type="password" id={id} data-testid="password-input" />
  </div>
);

describe('PasswordInput component', () => {
  it('should render an input field with type "password" to obscure characters', () => {
    // Arrange
    render(<PasswordInput label="Password" id="user-password" />);

    // Act
    const passwordInputField = screen.getByTestId('password-input');

    // Assert
    expect(passwordInputField).toBeInTheDocument();
    expect(passwordInputField).toHaveAttribute('type', 'password');
  });
});