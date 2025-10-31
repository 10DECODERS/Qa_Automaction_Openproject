import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from './UserProfile'; // Assuming UserProfile component is in UserProfile.js or UserProfile.tsx

describe('UserProfile', () => {
  it('should display the user\'s name and email', () => {
    // Arrange
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
    };

    // Act
    render(<UserProfile user={mockUser} />);

    // Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByAltText('User Avatar')).toHaveAttribute('src', mockUser.avatarUrl);
  });
});