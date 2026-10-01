import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  apiRequest,
} from '../services/api';

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  async function loadCurrentUser() {
    try {
      const data =
        await apiRequest(
          '/api/auth/me'
        );

      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function register(
    formData
  ) {
    const data =
      await apiRequest(
        '/api/auth/register',
        {
          method: 'POST',
          body:
            JSON.stringify(
              formData
            ),
        }
      );

    setUser(data.user);
  }

  async function login(
    email,
    password
  ) {
    const data =
      await apiRequest(
        '/api/auth/login',
        {
          method: 'POST',

          body:
            JSON.stringify({
              email,
              password,
            }),
        }
      );

    setUser(data.user);
  }

  async function logout() {
    await apiRequest(
      '/api/auth/logout',
      {
        method: 'POST',
      }
    );

    setUser(null);
  }

  async function updateProfile(
    profile
  ) {
    const data =
      await apiRequest(
        '/api/auth/profile',
        {
          method: 'PUT',

          body:
            JSON.stringify(
              profile
            ),
        }
      );

    setUser(data.user);

    return data.user;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}