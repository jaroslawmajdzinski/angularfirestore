import  tinycolor from 'tinycolor2';

import { IColor, ITailwindTheme } from './theme.interfaces';

export function computeColorPalette(hex: string): IColor[] {
  return [
    getColorObject(tinycolor(hex).lighten(45), '50'),
    getColorObject(tinycolor(hex).lighten(40), '100'),
    getColorObject(tinycolor(hex).lighten(30), '200'),
    getColorObject(tinycolor(hex).lighten(20), '300'),
    getColorObject(tinycolor(hex).lighten(10), '400'),
    getColorObject(tinycolor(hex), '500'),
    getColorObject(tinycolor(hex).darken(10), '600'),
    getColorObject(tinycolor(hex).darken(20), '700'),
    getColorObject(tinycolor(hex).darken(30), '800'),
    getColorObject(tinycolor(hex).darken(40), '900'),
    getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
    getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
    getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
    getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700')
  ];
}
export function getColorObject(value: tinycolor.Instance, name: string): IColor {
  const c = tinycolor(value);
  return {
    name,
    hex: c.toHexString(),
    isDarkContrast: c.isLight(),
  };
}
export function updateThemeVariables(theme: ITailwindTheme, document: Document) {
  for (const [name, color] of Object.entries(theme)) {
    const palette = computeColorPalette(color);
    for (const variant of palette) {
      document.documentElement.style.setProperty(`--${name}-${variant.name}`, variant.hex);
    }
  }
}