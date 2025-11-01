import AuthService from './AuthService';

describe('AuthService', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ token: 'mockJwtToken123' }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should successfully log in with valid 9-character complex password', async () => {
    // Arrange
    const username = 'testuser';
    const password = 'TestP@ss123'; // 9 chars: T(UP),e(LOW),s(LOW),t(LOW),P(UP),@(SPEC),s(LOW),1(NUM),2(NUM)

    // Act
    const result = await AuthService.login(username, password);

    // Assert
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    expect(result.success).toBe(true);
    expect(result.token).toBe('mockJwtToken123');
    expect(result.message).toBe('Login successful');
  });
});