import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    username: string;
    role: string;
    code?: string;
  } | null;
  login: (username: string, password: string, code: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (username: string, password: string, code: string) => {
        // Check GOVERNMENT credentials
        if (username === "Admin" && password === "andhrapradesh" && code === "AndhraPradesh") {
          set({
            isAuthenticated: true,
            user: {
              username: "Admin",
              role: "AndhraPradesh",
              code: code
            }
          });
          return true;
        }
        // Check PRINCIPAL credentials
        if (username === "Admin" && password === "principal" && code === "PRINCIPAL") {
          set({
            isAuthenticated: true,
            user: {
              username: "Admin",
              role: "PRINCIPAL",
              code: code
            }
          });
          return true;
        }
        return false;
      },
      logout: () => set({
        isAuthenticated: false,
        user: null
      })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);