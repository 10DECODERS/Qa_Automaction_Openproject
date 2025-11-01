import pytest
from app.auth_service import login_user

def test_login_fails_with_8_char_username():
    username = "user1234"
    password = "anypassword"
    expected_message = 'Invalid username or password. Please try again.'

    success, message = login_user(username, password)

    assert not success
    assert message == expected_message