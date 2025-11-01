def test_login_fails_with_exact_8_character_password():
    # Arrange
    username = "testuser"
    password = "password"  # Exactly 8 characters long

    # Act
    # Assuming 'login' is a function or method from the system under test
    # e.g., from my_app.auth_service import login
    # For a unit test, 'login' is the System Under Test.
    login_successful, error_message = login(username, password)

    # Assert
    assert not login_successful
    assert error_message == 'Invalid username or password. Please try again.'