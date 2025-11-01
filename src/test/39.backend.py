import pytest
import re

def login_user(username, password):
    if not re.search(r'\d', password):
        return False, 'Invalid username or password. Please try again.'
    
    return True, 'Login successful.'

def test_login_fails_with_password_missing_numeric_digit():
    username = 'testuser'
    password_no_digit = 'ValidPassword!'

    success, message = login_user(username, password_no_digit)

    assert not success
    assert message == 'Invalid username or password. Please try again.'
