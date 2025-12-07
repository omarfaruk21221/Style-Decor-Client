/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Background colors
        'background-light': '#ffffff',
        'background-dark': '#1a1a1a',

        // Text colors
        'text-light': '#1a1a1a',
        'text-dark': '#ffffff',
        'text-secondary-light': '#6b7280',
        'text-secondary-dark': '#9ca3af',

        // Border colors
        'border-light': '#e5e7eb',
        'border-dark': '#374151',

        // Input background colors
        'input-bg-light': '#f9fafb',
        'input-bg-dark': '#111827',

        // Primary color
        'primary': '#3b82f6',
      },
    },
  },
  plugins: [],
}
