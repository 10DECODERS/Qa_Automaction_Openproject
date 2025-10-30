import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm'; // Assuming your login form component is named LoginForm

describe('LoginForm', () => {
  it('should render a text input field for username', () => {
    render(<LoginForm />);
    const usernameInput = screen.getByLabelText(/username/i);

    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute('type', 'text');
  });
});