def test_login_fails_with_exactly_8_char_username():
    # Arrange
    username = "user1234"  # Exactly 8 characters
    password = "validpassword"

    # Act
    # Assuming 'authenticate_user' is the function under test,
    # imported from the application's authentication service.
    # It's expected to return a tuple: (success_status: bool, message: str)
    success, message = authenticate_user(username, password)

    # Assert
    assert success is False
    assert message == 'Invalid username or password. Please try again.'