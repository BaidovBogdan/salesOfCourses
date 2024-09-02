import { createContext, useState, ReactNode, useEffect } from 'react';
import { BASE_URL } from '../settings/settings';
import axios from 'axios';

interface AuthTokens {
  access: string;
  refresh: string;
}

interface User {}

interface AuthContextType {
  user: User | null;
  authTokens: AuthTokens | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    email: string,
    password: string,
    password2: string,
  ) => Promise<void>;
  logoutUser: () => void;
  updateToken: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authTokens: null,
  loginUser: async () => {},
  registerUser: async () => {},
  logoutUser: () => {},
  updateToken: () => {},
});

const parseJwt = (token: string): User | null => {
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(''),
    );

    return JSON.parse(jsonPayload) as User;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  const [user, setUser] = useState<User | null>(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? parseJwt(JSON.parse(tokens).access) : null;
  });

  const [loading, setLoading] = useState(true);

  const updateToken = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/account/refresh`,
        {
          refresh: authTokens?.refresh,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data);
        setUser(parseJwt(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
      } else {
        logoutUser();
      }

      if (loading) {
        setLoading(false);
        console.log('hello');
      }
    } catch (e: any) {
      setLoading(false);
      alert('Сервис временно не работает! Связитесь с Администратором');
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    const sevenHoursAndThirtyMinutes = 450 * 60 * 1000;

    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, sevenHoursAndThirtyMinutes);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/account/login/`, {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(parseJwt(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const registerUser = async (
    email: string,
    password: string,
    password2: string,
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/account/register/`,
        {
          email,
          password,
          password2,
        },
      );

      // Предположим, что сервер возвращает токены после регистрации
      const data = response.data;
      console.log(data);

      if (response.status === 200) {
        // Сохраняем токены и пользователя, как при входе
        setAuthTokens(data);
        setUser(parseJwt(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
        console.log('Registration successful and tokens set:', data); // Добавим вывод в консоль
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  const contextData: AuthContextType = {
    user,
    authTokens,
    loginUser,
    registerUser,
    updateToken,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
