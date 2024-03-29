/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
   ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "background": 'var(--background-color)',
         "contrast": 'var(--background-contrast)',
        'primary': {
          DEFAULT: 'var(--primary-500)',
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
        'primary-contrast': {
          DEFAULT: 'rgba(var(--primary-color-500), <alpha-value>)',
          50: 'rgba(var(--primary-contrast-50), <alpha-value>)',
          100: 'rgba(var(--primary-contrast-100), <alpha-value>)',
          200: 'rgba(var(--primary-contrast-200), <alpha-value>)',
          300: 'rgba(var(--primary-contrast-300), <alpha-value>)',
          400: 'rgba(var(--primary-contrast-400), <alpha-value>)',
          500: 'rgba(var(--primary-contrast-500), <alpha-value>)',
          600: 'rgba(var(--primary-contrast-600), <alpha-value>)',
          700: 'rgba(var(--primary-contrast-700), <alpha-value>)',
          800: 'rgba(var(--primary-contrast-800), <alpha-value>)',
          900: 'rgba(var(--primary-contrast-900), <alpha-value>)',
        },
        'secondary': {
          DEFAULT: 'var(--secondary-500)',
          50: 'var(--secondary-50)',
          100: 'var(--secondary-100)',
          200: 'var(--secondary-200)',
          300: 'var(--secondary-300)',
          400: 'var(--secondary-400)',
          500: 'var(--secondary-500)',
          600: 'var(--secondary-600)',
          700: 'var(--secondary-700)',
          800: 'var(--secondary-800)',
          900: 'var(--secondary-900)',
        },
        'primary-contrast': {
          DEFAULT: 'var(--secondary-color-500)',
          50: 'var(--secondary-contrast-50)',
          100: 'var(--secondary-contrast-100)',
          200: 'var(--secondary-contrast-200)',
          300: 'var(--secondary-contrast-300)',
          400: 'var(--secondary-contrast-400)',
          500: 'var(--secondary-contrast-500)',
          600: 'var(--secondary-contrast-600)',
          700: 'var(--secondary-contrast-700)',
          800: 'var(--secondary-contrast-800)',
          900: 'var(--secondary-contrast-900)',
        },
        'accent': {
          DEFAULT: 'var(--accent-500)',
          50: 'var(--accent-50)',
          100: 'var(--accent-100)',
          200: 'var(--accent-200)',
          300: 'var(--accent-300)',
          400: 'var(--accent-400)',
          500: 'var(--accent-500)',
          600: 'var(--accent-600)',
          700: 'var(--accent-700)',
          800: 'var(--accent-800)',
          900: 'var(--accent-900)',
        },
        'accent-contrast': {
          DEFAULT: 'var(--accent-color-500)',
          50: 'var(--accent-contrast-50)',
          100: 'var(--accent-contrast-100)',
          200: 'var(--accent-contrast-200)',
          300: 'var(--accent-contrast-300)',
          400: 'var(--accent-contrast-400)',
          500: 'var(--accent-contrast-500)',
          600: 'var(--accent-contrast-600)',
          700: 'var(--accent-contrast-700)',
          800: 'var(--accent-contrast-800)',
          900: 'var(--accent-contrast-900)',
        },
        'danger': {
          DEFAULT: 'var(--danger-500)',
          50: 'var(--danger-50)',
          100: 'var(--danger-100)',
          200: 'var(--danger-200)',
          300: 'var(--danger-300)',
          400: 'var(--danger-400)',
          500: 'var(--danger-500)',
          600: 'var(--danger-600)',
          700: 'var(--danger-700)',
          800: 'var(--danger-800)',
          900: 'var(--danger-900)',
        },
        'danger-contrast': {
          DEFAULT: 'var(--danger-color-500)',
          50: 'var(--danger-contrast-50)',
          100: 'var(--danger-contrast-100)',
          200: 'var(--danger-contrast-200)',
          300: 'var(--danger-contrast-300)',
          400: 'var(--danger-contrast-400)',
          500: 'var(--danger-contrast-500)',
          600: 'var(--danger-contrast-600)',
          700: 'var(--danger-contrast-700)',
          800: 'var(--danger-contrast-800)',
          900: 'var(--danger-contrast-900)',
        },
        'success': {
          DEFAULT: 'var(--success-500)',
          50: 'var(--success-50)',
          100: 'var(--success-100)',
          200: 'var(--success-200)',
          300: 'var(--success-300)',
          400: 'var(--success-400)',
          500: 'var(--success-500)',
          600: 'var(--success-600)',
          700: 'var(--success-700)',
          800: 'var(--success-800)',
          900: 'var(--success-900)',
        },
        'success-contrast': {
          DEFAULT: 'var(--success-color-500)',
          50: 'var(--success-contrast-50)',
          100: 'var(--success-contrast-100)',
          200: 'var(--success-contrast-200)',
          300: 'var(--success-contrast-300)',
          400: 'var(--success-contrast-400)',
          500: 'var(--success-contrast-500)',
          600: 'var(--success-contrast-600)',
          700: 'var(--success-contrast-700)',
          800: 'var(--success-contrast-800)',
          900: 'var(--success-contrast-900)',
        },
        'background': {
          DEFAULT: 'var(--background-500)',
          50: 'var(--background-50)',
          100: 'var(--background-100)',
          200: 'var(--background-200)',
          300: 'var(--background-300)',
          400: 'var(--background-400)',
          500: 'var(--background-500)',
          600: 'var(--background-600)',
          700: 'var(--background-700)',
          800: 'var(--background-800)',
          900: 'var(--background-900)',
        },
        'background-contrast': {
          DEFAULT: 'var(--background-color-500)',
          50: 'var(--background-contrast-50)',
          100: 'var(--background-contrast-100)',
          200: 'var(--background-contrast-200)',
          300: 'var(--background-contrast-300)',
          400: 'var(--background-contrast-400)',
          500: 'var(--background-contrast-500)',
          600: 'var(--background-contrast-600)',
          700: 'var(--background-contrast-700)',
          800: 'var(--background-contrast-800)',
          900: 'var(--background-contrast-900)',
        },
      }
    },
  },
  plugins: [],
}

