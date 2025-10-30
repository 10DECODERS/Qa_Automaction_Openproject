import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage'; // Assuming LoginPage is the component to test

describe('LoginPage mobile responsiveness', () => {
  it('should render a mobile-specific navigation icon when viewed on a mobile device', () => {
    // Arrange
    // We simulate a mobile context by passing an `isMobile` prop as true.
    // In a real application, this prop would likely be derived from a media query hook or context provider.
    const isMobileDevice = true;

    // Act
    render(<LoginPage isMobile={isMobileDevice} />);

    // Assert
    // Verify that an element specific to mobile layout (e.g., a hamburger menu icon) is present.
    // This confirms the component's conditional rendering logic for adapting to mobile screens.
    expect(screen.getByTestId('mobile-nav-icon')).toBeInTheDocument();
  });
});