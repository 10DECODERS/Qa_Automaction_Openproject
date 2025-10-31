import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm'; // Assuming LoginForm is the component containing the username field

describe('LoginForm', () => {
  it('should display a visible username input field of type text', () => {
    // Arrange
    render(<LoginForm />);

    // Act
    const usernameInput = screen.getByLabelText(/username/i); // Finds input associated with 'username' label

    // Assert
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toBeVisible();
    expect(usernameInput).toHaveAttribute('type', 'text');
  });
});