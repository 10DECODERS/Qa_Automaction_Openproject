def test_calculate_cart_total_multiple_items():
    def calculate_cart_total(items):
        total = 0.0
        for item in items:
            total += item['price'] * item['quantity']
        return total
    items = [
        {'id': '1', 'name': 'Laptop', 'price': 1200.00, 'quantity': 1},
        {'id': '2', 'name': 'Mouse', 'price': 25.50, 'quantity': 2}
    ]
    expected_total = 1200.00 * 1 + 25.50 * 2
    total = calculate_cart_total(items)
    assert total == expected_total