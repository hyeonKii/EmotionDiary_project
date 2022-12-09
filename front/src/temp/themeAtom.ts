import { atom } from 'recoil';

export enum ThemeEnums {
  LIGHT = 0,
  DARK = 1,
};

const { LIGHT, DARK } = ThemeEnums;

export const getTheme = (): ThemeEnums => {
  const theme: number = Number(localStorage.getItem('theme'));

  if (theme === DARK) {
    return DARK;
  }

  return LIGHT;
}

export const themeMode = atom<ThemeEnums>({
  key: 'theme',
  default: getTheme(),
  
});