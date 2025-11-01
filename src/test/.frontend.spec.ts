describe('calculateCartTotal', () => {
  it('should correctly calculate the total price for multiple items', () => {
    const calculateCartTotal = (items) => {
      return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    const items = [
      { id: '1', name: 'Laptop', price: 1200.00, quantity: 1 },
      { id: '2', name: 'Mouse', price: 25.50, quantity: 2 }
    ];
    const expectedTotal = 1200.00 * 1 + 25.50 * 2;
    const total = calculateCartTotal(items);
    expect(total).toBe(expectedTotal);
  });
});