from werkzeug.security import generate_password_hash, check_password_hash

# Assume this class would be in an auth_service.py file
class AuthService:
    def __init__(self):
        # Mock user database with a pre-hashed password for 'testuser'
        # Password: 'TestP@ss123' (9 chars, U/L/N/S)
        self._users_db = {
            "testuser": {
                "hashed_password": generate_password_hash("TestP@ss123")
            }
        }

    def login_user(self, username, password):
        user_data = self._users_db.get(username)
        if not user_data:
            return False, "User not found"
        
        if check_password_hash(user_data["hashed_password"], password):
            return True, "Login successful"
        else:
            return False, "Invalid credentials"

def test_successful_login_with_valid_complex_password():
    # Arrange
    auth_service = AuthService()
    username = "testuser"
    password = "TestP@ss123"  # 9 chars: T(UP),e(LOW),s(LOW),t(LOW),P(UP),@(SPEC),s(LOW),1(NUM),2(NUM)

    # Act
    success, message = auth_service.login_user(username, password)

    # Assert
    assert success is True
    assert message == "Login successful"