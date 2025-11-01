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

import { render, screen } from '@testing-library/react';
import React from 'react';

// Assuming a PasswordInput component like this exists:
// function PasswordInput() {
//   return (
//     <div>
//       <label htmlFor="password-field">Password</label>
//       <input id="password-field" type="password" />
//     </div>
//   );
// }
// export default PasswordInput;
// For the test, we'll use a local mock component to ensure self-containment for the prompt

const PasswordInput = () => {
  return (
    <input data-testid="password-input" type="password" aria-label="Password" />
  );
};

describe('PasswordInput', () => {
  it('should render an input field with type password', () => {
    // Arrange
    render(<PasswordInput />);

    // Act
    const passwordField = screen.getByTestId('password-input');

    // Assert
    expect(passwordField).toHaveAttribute('type', 'password');
  });
});