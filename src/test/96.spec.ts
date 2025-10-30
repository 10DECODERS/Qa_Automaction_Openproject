const checkLoginHttpsSecurity = () => {
  return typeof window !== 'undefined' && window.location.protocol === 'https:';
};

describe('checkLoginHttpsSecurity', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // Create a writable mock of window.location for each test
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...originalLocation }
    });
  });

  afterEach(() => {
    // Restore the original window.location after each test
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation
    });
  });

  it('should return true when the protocol is HTTPS', () => {
    // Arrange
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, protocol: 'https:' }
    });

    // Act
    const isSecure = checkLoginHttpsSecurity();

    // Assert
    expect(isSecure).toBe(true);
  });
});