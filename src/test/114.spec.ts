describe('LoginPage', () => {
  it('should display a Username input field', () => {
    // Arrange
    const { render, screen } = require('@testing-library/react');
    const LoginPage = () => (
      <form>
        <label htmlFor="username-input">Username</label>
        <input id="username-input" type="text" placeholder="Enter your username" />
        <label htmlFor="password-input">Password</label>
        <input id="password-input" type="password" placeholder="Enter your password" />
        <button type="submit">Login</button>
      </form>
    );

    // Act
    render(<LoginPage />);
    const usernameInputField = screen.getByLabelText(/username/i);

    // Assert
    expect(usernameInputField).toBeInTheDocument();
  });
});