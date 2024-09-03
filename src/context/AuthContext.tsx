import { createContext, useState, ReactNode, useEffect } from 'react';
import { BASE_URL } from '../settings/settings';
import axios from 'axios';
import { Input, Modal, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

interface AuthTokens {
  access: string;
  refresh: string;
}

export interface ProfileData {
  first_name?: string;
  last_name?: string;
  photo?: File | null;
  description?: string;
  link_to_portfolio?: string;
  link_to_behance?: string;
  link_to_instagram?: string;
  link_to_artstation?: string;
}

interface User {}

interface AuthContextType {
  user: User | null;
  userProfile: ProfileData | null;
  authTokens: AuthTokens | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    email: string,
    password: string,
    password2: string,
  ) => Promise<void>;
  logoutUser: () => void;
  updateToken: () => void;
  handleForgotPassword: (email: string) => Promise<void>;
  handleForgotPasswordConfirm: (
    code: string,
    newPassword: string,
    newPasswordConfirm: string,
  ) => Promise<void>;
  updateProfile: (profileData: ProfileData) => Promise<void>;
  fetchProfile: () => Promise<void>;
  changePassword: (
    oldPassword: string,
    newPassword: string,
    newPasswordConfirm: string,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  userProfile: null,
  user: null,
  authTokens: null,
  loginUser: async () => {},
  registerUser: async () => {},
  logoutUser: () => {},
  updateToken: () => {},
  changePassword: async () => {},
  handleForgotPassword: async () => {},
  handleForgotPasswordConfirm: async () => {},
  updateProfile: async () => {},
  fetchProfile: async () => {},
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
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? parseJwt(JSON.parse(tokens).access) : null;
  });

  const [loading, setLoading] = useState(true);

  const [userProfile, setUserProfile] = useState<ProfileData | null>(null);

  const fetchProfile = async () => {
    setLoading(true); // Set loading to true when starting to fetch
    try {
      if (authTokens?.access) {
        const response = await axios.patch(
          `${BASE_URL}/api/v1/account/update_user/`,
          {}, // Empty body for fetching
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authTokens.access}`,
            },
          },
        );
        setUserProfile(response.data); // Update profile data
      }
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
      setUserProfile(null); // Clear profile data on error
    } finally {
      setLoading(false); // End loading state
    }
  };

  const updateToken = async () => {
    try {
      if (!authTokens?.refresh) return;
      const response = await axios.post(`${BASE_URL}/api/v1/account/refresh/`, {
        refresh: authTokens.refresh,
      });

      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data); // Update tokens in state
        setUser(parseJwt(data.access)); // Parse and set the user from access token
        localStorage.setItem('authTokens', JSON.stringify(data)); // Persist tokens
      } else {
        logoutUser(); // Logout if the refresh fails
      }
    } catch (error: any) {
      console.error('Token refresh error:', error); // Log the error for debugging
      setLoading(false); // Ensure loading is set to false on error
      alert('ЧТО ТО ПРОИЗОШЛО С АККАУНТОМ!!!');
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken().finally(() => setLoading(false)); // Update token on initial load
    }

    const sevenHoursAndThirtyMinutes = 450 * 60 * 1000; // 7 hours and 30 minutes in milliseconds

    const interval = setInterval(() => {
      if (authTokens) {
        updateToken(); // Periodically refresh the token
      }
    }, sevenHoursAndThirtyMinutes);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [authTokens, loading]); // Depend on `authTokens` and `loading` to avoid unnecessary re-renders

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
        navigate('/');
        notification.success({
          message: 'Login Successful',
          description: 'You have logged in successfully!',
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      notification.error({
        message: 'Login Error',
        description: 'Invalid credentials. Please try again.',
      });
      throw error;
    }
  };

  const updateProfile = async (profileData: ProfileData) => {
    try {
      const formData = new FormData();

      Object.keys(profileData).forEach((key) => {
        const value = profileData[key as keyof ProfileData];

        if (value !== undefined && value !== null) {
          if (key === 'photo' && value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === 'string') {
            formData.append(key, value);
          }
        }
      });

      const response = await axios.patch(
        `${BASE_URL}/api/v1/account/update_user/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authTokens?.access}`,
          },
        },
      );

      setUserProfile(response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
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

      if (response.status === 201) {
        message.success(
          'Registration successful. Please check your email for the activation code.',
        );

        let activationCode = '';

        Modal.confirm({
          title: 'Activate Your Account',
          content: (
            <Input
              placeholder="Enter activation code"
              onChange={(e) => (activationCode = e.target.value)}
            />
          ),
          okText: 'Activate',
          cancelText: 'Cancel',
          onOk: async () => {
            try {
              const activationResponse = await axios.post(
                `${BASE_URL}/api/v1/account/activate/`,
                {
                  activation_code: activationCode,
                },
              );

              const tokens = activationResponse.data;

              if (activationResponse.status === 201) {
                message.success('Account activated successfully!');
                setAuthTokens(tokens);
                setUser(parseJwt(tokens.access));
                localStorage.setItem('authTokens', JSON.stringify(tokens));
                navigate('/');
                notification.success({
                  message: 'Account Activated',
                  description: 'Account activated successfully!',
                });
              } else {
                notification.error({
                  message: 'Activation Failed',
                  description: 'Activation failed. Please try again.',
                });
              }
            } catch (error) {
              console.error('Activation error:', error);
              notification.error({
                message: 'Activation Failed',
                description: 'Activation failed. Please try again.',
              });
            }
          },
          onCancel: () => {
            console.log('Activation cancelled');
          },
        });
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      notification.error({
        message: 'Registration Error',
        description: 'Registration failed. Please try again.',
      });
      throw error;
    }
  };

  const changePassword = async (
    oldPassword: string,
    newPassword: string,
    newPasswordConfirm: string,
  ) => {
    try {
      if (!authTokens?.access) {
        throw new Error('No access token found.');
      }

      const response = await axios.post(
        `${BASE_URL}/api/v1/account/change_password/`,
        {
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirm: newPasswordConfirm, // Add this field to match backend requirements
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        },
      );

      if (response.status === 200) {
        notification.success({
          message: 'Password Changed',
          description: 'Your password has been changed successfully!',
        });
      } else {
        notification.error({
          message: 'Change Password Error',
          description: 'Failed to change password. Please try again.',
        });
      }
    } catch (error: any) {
      console.error(
        'Change password error:',
        error.response?.data || error.message,
      );
      notification.error({
        message: 'Change Password Error',
        description:
          error.response?.data?.non_field_errors?.[0] ||
          'Failed to change password. Please try again.',
      });
      throw error;
    }
  };

  const handleForgotPasswordConfirm = async (
    code: string,
    new_password: string,
    new_password_confirm: string,
  ) => {
    try {
      await axios.post(`${BASE_URL}/api/v1/account/forgot_password_confirm/`, {
        code: code,
        new_password: new_password,
        new_password_confirm: new_password_confirm,
      });
      notification.success({
        message: 'Password Changed',
        description: 'Your password has been changed successfully.',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to change the password. Please try again.',
      });
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      await axios.post(`${BASE_URL}/api/v1/account/forgot_password/`, {
        email: email,
      });
      notification.success({
        message: 'email code',
        description: 'Password reset code has been sent to your email.',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to send password reset link. Please try again.',
      });
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    setUserProfile(null);
    localStorage.removeItem('authTokens');
    notification.success({
      message: 'Logout Successful',
      description: 'You have logged out successfully!',
    });
  };

  const contextData: AuthContextType = {
    user,
    userProfile,
    authTokens,
    loginUser,
    registerUser,
    updateToken,
    logoutUser,
    changePassword,
    handleForgotPassword,
    handleForgotPasswordConfirm,
    updateProfile,
    fetchProfile,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
