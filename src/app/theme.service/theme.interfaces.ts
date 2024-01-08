// tailwind-theme.interface.ts
export interface IColor {
    name: string;
    hex: string;
    isDarkContrast: boolean;
  }
  export interface ITailwindTheme {
    'primary': string;
    'primary-contrast': string;
    'secondary': string;
    'secondary-contrast': string;
    'accent': string;
    'accent-contrast': string;
    'danger': string;
    'danger-contrast': string
    'success': string;
    'success-contrast': string;  
    'background': string;
    'background-contrast': string;
    }

    export interface IOneTailwindTheme{
      name: string;
      isDarkTheme: boolean;
      colors: ITailwindTheme
    }

  
