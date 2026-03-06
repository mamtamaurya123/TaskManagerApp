import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { AuthState, User } from "../types";
import StorageService from "../services/StorageService";
import {
  STORAGE_KEYS,
  DUMMY_CREDENTIALS,
  DUMMY_USER,
  CONSTANTS_DATA,
} from "../constants";

interface AuthContextType extends AuthState {
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      const user = await StorageService.get<User>(STORAGE_KEYS.USER);
      setAuthState({ user, isAuthenticated: !!user, isLoading: false });
    })();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    await new Promise((r) => setTimeout(r, 800)); 
    if (
      username.trim() === DUMMY_CREDENTIALS.username &&
      password === DUMMY_CREDENTIALS.password
    ) {
      await StorageService.set(STORAGE_KEYS.USER, DUMMY_USER);
      setAuthState({
        user: DUMMY_USER,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true };
    }
    return { success: false, error: CONSTANTS_DATA.InvalidText };
  }, []);

  const logout = useCallback(async () => {
    await StorageService.remove(STORAGE_KEYS.USER);
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error(CONSTANTS_DATA.ErrorText);
  return ctx;
};
