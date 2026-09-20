import { create } from 'zustand';

export type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  initTheme: () => void;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const useTheme = create<ThemeStore>((set, get) => ({
  theme: 'light',
  initTheme: () => {
    if (typeof window !== 'undefined') {
      const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        set({ theme: 'dark' });
      } else {
        document.documentElement.classList.remove('dark');
        set({ theme: 'light' });
      }
    }
  },
  toggleTheme: () => {
    const current = get().theme;
    const nextTheme: Theme = current === 'light' ? 'dark' : 'light';
    if (typeof window !== 'undefined') {
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
    set({ theme: nextTheme });
  },
  setTheme: (theme: Theme) => {
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
    set({ theme });
  }
}));

export default useTheme;
