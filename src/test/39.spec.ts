def test_successful_login_with_valid_complex_9_char_password():
    # Arrange
    username = "testuser"
    password = "Pass@123!"

    # Act
    result = login_user(username, password)

    # Assert
    assert result is True