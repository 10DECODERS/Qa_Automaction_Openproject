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