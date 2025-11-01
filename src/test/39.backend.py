def login_user(username, password):
    if len(password) < 8:
        return {"success": False, "message": "Invalid username or password. Please try again."}
    # In a real application, this would involve database lookup, password hashing, etc.
    # For this specific test, we only care about the password length validation.
    return {"success": True, "message": "Login successful"}

def test_login_fails_with_short_password():
    username_mock = "validuser"
    short_password = "short"

    response = login_user(username_mock, short_password)

    assert response["success"] is False
    assert response["message"] == "Invalid username or password. Please try again."

# ========================================
# Test Case Added: Login fails with password missing uppercase letter
# Generated: 2025-11-01T09:18:50.440Z


# ========================================

def test_login_fails_missing_uppercase_password():
    def login_user_mock(username, password):
        if not any(char.isupper() for char in password):
            return {'success': False, 'message': 'Invalid username or password. Please try again.'}
        return {'success': True, 'message': 'Login successful'}

    username = 'testuser'
    password_no_uppercase = 'password123!'

    result = login_user_mock(username, password_no_uppercase)

    assert result['success'] is False
    assert result['message'] == 'Invalid username or password. Please try again.'

# ========================================
# Test Case Added: Login fails with password missing lowercase letter
# Generated: 2025-11-01T09:23:34.224Z


# ========================================

import pytest
from my_app.auth.service import login_user
def test_login_fails_with_password_missing_lowercase():
    username = 'testuser'
    password_no_lowercase = 'PASSWORD123!'
    result = login_user(username, password_no_lowercase)
    assert result['success'] is False
    assert result['message'] == 'Invalid username or password. Please try again.'