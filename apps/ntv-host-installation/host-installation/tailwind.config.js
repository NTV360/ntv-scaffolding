const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Nunito',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },
      colors: {
        // Default theme colors (matching global.css variables)
        default: {
          DEFAULT: '#c0c4cc',
          primary: '#8dcb2c',
          'primary-focused': '#7ab82a',
          success: '#10b981',
          danger: '#dc2626',
          white: '#ffffff',
          'white-focused': '#f9fafb',
          'description-white': '#F8F8F9',
        },
        neutral: {
          50: '#ffffff',
          100: '#f9fafb',
          200: '#F8F8F9',
          300: '#999eaa',
        },
        'neutral-dark': {
          50: '#f0f2f9',
          100: '#d9e0f0',
          200: '#b3c1e1',
          300: '#8ca2d2',
          400: '#6683c3',
          500: '#4064b4',
          600: '#091635',
          700: '#071229',
          800: '#050e1d',
          900: '#030a11',
        },
        primary: {
          50: '#f0f2f9',
          100: '#d9e0f0',
          200: '#b3c1e1',
          300: '#8ca2d2',
          400: '#6683c3',
          500: '#4064b4',
          600: '#091635',
          700: '#071229',
          800: '#050e1d',
          900: '#030a11',
        },
        accent: {
          50: '#f7fcf0',
          100: '#e8f5d1',
          200: '#d1eba3',
          300: '#bae175',
          400: '#a3d747',
          500: '#8dcb2c',
          600: '#71a223',
          700: '#55791a',
          800: '#395011',
          900: '#1d2808',
        },
        description: {
          600: '#6b7280', // gray-600
          700: '#4b5563', // gray-700
          500: '#9ca3af', // gray-500
        },
        info: {
          50: '#f0f6ff',
          100: '#d1e7ff',
          200: '#a3cfff',
          300: '#75b7ff',
          400: '#479fff',
          500: '#095af3',
          600: '#0748c2',
          700: '#053691',
          800: '#032460',
          900: '#011230',
        },
        alert: '#26A69A',
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#3adb30',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#ffa500',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#e73535',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Dark mode specific colors
        dark: {
          bg: {
            primary: '#1f2937', // gray-800
            secondary: '#374151', // gray-700
            tertiary: '#4b5563', // gray-600
          },
          text: {
            primary: '#f9fafb', // gray-50
            secondary: '#e5e7eb', // gray-200
            tertiary: '#d1d5db', // gray-300
            muted: '#9ca3af', // gray-400
          },
          border: {
            primary: '#4b5563', // gray-600
            secondary: '#6b7280', // gray-500
          },
          accent: {
            primary: '#3b82f6', // blue-500
            secondary: '#1d4ed8', // blue-700
            hover: '#2563eb', // blue-600
          },
        },
      },
    },
  },
  plugins: [],
};
