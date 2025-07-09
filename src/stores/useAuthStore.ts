import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_premium: boolean;
  created_at: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-store",
    }
  )
);
