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

export function computeColorPaletteContrast(hex: string){
  
   const dark = tinycolor(hex).darken(80).setAlpha(0.87)
   const light = tinycolor(hex).lighten(90)
    
  
  return [
    getColorObjectRgb(dark, '50'),
    getColorObjectRgb(dark, '100'),
    getColorObjectRgb(dark, '200'),
    getColorObjectRgb(dark, '300'),
    getColorObjectRgb(dark, '400'),
    getColorObjectRgb(light, '500'),
    getColorObjectRgb(light, '600'),
    getColorObjectRgb(light, '700'),
    getColorObjectRgb(light, '800'),
    getColorObjectRgb(light, '900'),
    getColorObjectRgb(dark, 'A100'),
    getColorObjectRgb(light, 'A200'),
    getColorObjectRgb(light, 'A400'),
    getColorObjectRgb(light, 'A700')
  ]
}

export function getColorObjectRgb(value: tinycolor.Instance, name: string): IColor {
  const c = tinycolor(value);
  return {
    name,
    hex: c.toRgbString(),
    isDarkContrast: c.isLight(),
  };
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
    let palette = name.includes('contrast')? computeColorPaletteContrast(color) : computeColorPalette(color);
    for (const variant of palette) {
      document.documentElement.style.setProperty(`--${name}-${variant.name}`, variant.hex);
    }
  }
}