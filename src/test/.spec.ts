describe('Button', () => {
  it('should render its label and call the onClick handler when clicked', () => {
    // Arrange
    const buttonLabel = 'Submit Form';
    const handleClick = jest.fn();

    // Act
    render(<Button label={buttonLabel} onClick={handleClick} />);
    const buttonElement = screen.getByText(buttonLabel);
    fireEvent.click(buttonElement);

    // Assert
    expect(buttonElement).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});