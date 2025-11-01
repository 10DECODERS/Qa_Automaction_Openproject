import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage'; // Assuming LoginPage component is in this path

describe('LoginPage responsive rendering', () => {
  it('should render mobile-specific elements when operating in a mobile context', () => {
    // Arrange
    const isMobileSimulated = true;

    // Act
    render(<LoginPage isMobile={isMobileSimulated} />);

    // Assert
    expect(screen.getByRole('heading', { name: /Mobile Login Form/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Desktop Login Form/i })).not.toBeInTheDocument();
  });
});