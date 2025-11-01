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