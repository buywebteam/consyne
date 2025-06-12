/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

// Define the context value type
interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => ReturnType<typeof supabase.auth.signInWithPassword>;
  signup: (
    email: string,
    password: string
  ) => ReturnType<typeof supabase.auth.signUp>;
  logout: () => ReturnType<typeof supabase.auth.signOut>;
}

// Create context with default undefined value (will be initialized in provider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session: Session | null) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password });

  const signup = (email: string, password: string) =>
    supabase.auth.signUp({ email, password });

  const logout = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
