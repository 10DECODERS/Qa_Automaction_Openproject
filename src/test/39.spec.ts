import pytest

def test_successful_login_with_valid_credentials():
    # Arrange
    valid_username = "ValidUser_123!"
    valid_password = "SecureP@ssw0rd1"

    # Act
    # This assumes 'login' is the function or method under test,
    # imported or accessible within the test's scope from the application's source code.
    result = login(valid_username, valid_password)

    # Assert
    assert result is True