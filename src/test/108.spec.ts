import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage'; // Assuming LoginPage component is in './LoginPage.jsx' or './LoginPage.tsx'

describe('LoginPage', () => {
  it('should display essential UI elements and allow basic interaction', () => {
    render(<LoginPage />);

    // Verify presence of core UI elements
    const loginTitle = screen.getByRole('heading', { name: /login/i });
    expect(loginTitle).toBeInTheDocument();

    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute('type', 'text');

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute('type', 'submit');

    const forgotPasswordLink = screen.getByRole('link', { name: /forgot password\?/i });
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password');

    // Verify basic functionality: input fields can be typed into
    fireEvent.change(usernameInput, { target: { value: 'mobileUser' } });
    expect(usernameInput).toHaveValue('mobileUser');

    fireEvent.change(passwordInput, { target: { value: 'mobilePass123' } });
    expect(passwordInput).toHaveValue('mobilePass123');

    // Verify basic functionality: button is clickable (though we don't test actual form submission here)
    fireEvent.click(signInButton);
    // Further assertions here could check if an onSubmit handler was called if it was mocked.
  });
});