/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: '#ffffff', // Default theme color
  setTheme: (color: any) => set({ theme: color }),
  resetTheme: () => set({ theme: '#ffffff' }),
}));
