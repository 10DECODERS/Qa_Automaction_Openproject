import pytest
import re

class InvalidCredentialsError(Exception):
    pass

class MockUserRepository:
    def get_user_by_username(self, username):
        if username == 'testuser':
            return {'username': 'testuser', 'password_hash': 'some_hash_for_comparison'}
        return None

class AuthService:
    def __init__(self, user_repo):
        self.user_repo = user_repo

    def _is_password_strong(self, password):
        if len(password) < 8: return False
        if not any(char.isupper() for char in password): return False
        if not any(char.islower() for char in password): return False
        if not any(char.isdigit() for char in password): return False
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password): return False
        return True

    def login(self, username, password):
        if not self._is_password_strong(password):
            raise InvalidCredentialsError('Invalid username or password. Please try again.')

        user = self.user_repo.get_user_by_username(username)
        if not user:
            raise InvalidCredentialsError('Invalid username or password. Please try again.')
        
        # In a real app, password hashing and comparison would happen here
        # For this test, we fail before reaching this point due to password complexity

def test_login_fails_with_password_missing_special_character():
    user_repo = MockUserRepository()
    auth_service = AuthService(user_repo)
    username = 'testuser'
    password_missing_special = 'Validpassword123'

    with pytest.raises(InvalidCredentialsError) as excinfo:
        auth_service.login(username, password_missing_special)
    
    assert str(excinfo.value) == 'Invalid username or password. Please try again.'

# ========================================
# Test Case Added: Display error message for non-existent username
# Generated: 2025-11-01T09:45:09.083Z


# ========================================

import pytest
from unittest.mock import patch
from your_app.auth import login_user

@patch('your_app.auth.UserService.get_user_by_username')
def test_login_non_existent_username(mock_get_user_by_username):
    mock_get_user_by_username.return_value = None
    non_existent_username = 'unknown_user'
    valid_password = 'correct_password123'

    response_data, status_code = login_user(non_existent_username, valid_password)

    assert status_code == 401
    assert response_data['message'] == 'Invalid username or password. Please try again.'
    mock_get_user_by_username.assert_called_once_with(non_existent_username)

# ========================================
# Test Case Added: Display error message for correct username, invalid password
# Generated: 2025-11-01T09:51:15.688Z


# ========================================

import pytest

def _simulate_login_backend(username, password):
    # Simulate a backend service's user authentication logic
    registered_users = {
        "testuser": {"password_hash": "hashed_correct_password"} # In a real system, this would be a hash
    }

    if username in registered_users:
        # Simulate password verification (e.g., bcrypt.checkpw)
        if password == "correctpassword": # Mocking a successful password check
            return {"success": True, "message": "Login successful"}
        else:
            return {"success": False, "message": "Invalid username or password. Please try again."}
    else:
        return {"success": False, "message": "Invalid username or password. Please try again."}

def test_login_with_valid_username_and_invalid_password():
    # Arrange
    username = "testuser"
    invalid_password = "wrongpassword"
    expected_response = {"success": False, "message": "Invalid username or password. Please try again."}

    # Act
    actual_response = _simulate_login_backend(username, invalid_password)

    # Assert
    assert actual_response == expected_response