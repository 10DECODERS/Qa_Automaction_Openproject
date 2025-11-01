from unittest.mock import MagicMock
import pytest
from app.services.user_service import UserService # Adjust path as per your project structure

def test_successful_login_with_9_char_username():
    # Arrange
    mock_user_repository = MagicMock()
    mock_password_util = MagicMock()
    user_service = UserService(mock_user_repository, mock_password_util)

    username = 'user@1234' # Exactly 9 characters (alphanumeric and special)
    password = 'ValidP@ss1' # Valid password meeting complexity rules

    mock_user_data = {
        'username': username,
        'hashed_password': 'fake_hashed_password_for_user_@1234'
    }

    # Configure mocks to simulate a found user and correct password
    mock_user_repository.find_by_username.return_value = mock_user_data
    mock_password_util.verify_password.return_value = True

    # Act
    result = user_service.login(username, password)

    # Assert
    mock_user_repository.find_by_username.assert_called_once_with(username)
    mock_password_util.verify_password.assert_called_once_with(password, mock_user_data['hashed_password'])
    assert result['success'] is True
    assert result['message'] == 'Login successful'
    assert result['username'] == username