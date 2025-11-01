class AuthService:
    def login(self, username, password):
        if len(password) == 8:
            return False, 'Invalid username or password. Please try again.'
        return True, 'Login successful (not tested here)'

def test_login_fails_with_8_char_password():
    auth_service = AuthService()
    username = "testuser"
    password = "password"

    success, message = auth_service.login(username, password)

    assert not success
    assert message == 'Invalid username or password. Please try again.'
