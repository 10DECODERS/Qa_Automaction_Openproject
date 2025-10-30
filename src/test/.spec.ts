import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter'; // Assuming the component is in Counter.js/tsx

describe('Counter', () => {
  it('should increment the count when the Increment button is clicked', () => {
    // Arrange
    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: /increment/i }); // Case-insensitive match for the button text

    // Act
    fireEvent.click(incrementButton);

    // Assert
    // Assuming the component displays "Count: X"
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});