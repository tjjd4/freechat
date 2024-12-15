export const getUserInfo = async () => {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const res = await response.json();

      if (res.success) {
        return {
          "name": res.data.name,
        };
      }
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const isLogin = async (): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:3000/is_login', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const res = await response.json();
      if (res.success) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export interface LoginResponse {
  success: boolean;
  message: string;
}

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const res = await response.json();
    if (response.ok && res.success) {
      return {
        success: true,
        message: res.data,
      };
    }
    return {
      success: false,
      message: res.data,
    };
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      const res = await response.json();

      if (res.success) {
        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};