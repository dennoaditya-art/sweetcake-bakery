'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="relative w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      <span className={`transition-all duration-500 ${dark ? 'opacity-100 scale-100' : 'opacity-0 scale-0 absolute'}`}>☀️</span>
      <span className={`transition-all duration-500 ${dark ? 'opacity-0 scale-0 absolute' : 'opacity-100 scale-100'}`}>🌙</span>
    </button>
  );
}
