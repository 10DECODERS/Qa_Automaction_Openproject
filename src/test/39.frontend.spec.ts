import { renderHook, act } from '@testing-library/react-hooks';
import authService from '../src/services/authService'; // Adjust path as per your project structure
import useAuth from '../src/hooks/useAuth'; // Adjust path as per your project structure

jest.mock('../src/services/authService'); // Mock the entire authService module

describe('useAuth', () => {
  it('should successfully log in a user with a 9-character username', async () => {
    // Arrange
    const username = 'user@1234'; // Exactly 9 characters (alphanumeric and special)
    const password = 'ValidP@ss1'; // Valid password meeting complexity rules
    
    // Mock successful API response from authService
    authService.login.mockResolvedValueOnce({
      success: true,
      token: 'mock-jwt-token',
      user: { username }
    });

    // Act
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login(username, password);
    });

    // Assert
    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(authService.login).toHaveBeenCalledWith(username, password);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.error).toBeNull();
  });
});