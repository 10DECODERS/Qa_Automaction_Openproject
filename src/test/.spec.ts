import { capitalizeFirstLetter } from './utils'; // Assuming this utility function exists in a 'utils' file

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a given string', () => {
    // Arrange
    const input = 'hello world';

    // Act
    const result = capitalizeFirstLetter(input);

    // Assert
    expect(result).toBe('Hello world');
  });
});