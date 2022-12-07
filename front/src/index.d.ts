import 'styled-components'

declare module "*.jpg";
declare module "*.ttf";
declare module "*.png";

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    navColor: string;
    textColor: string;
    spanColor: string;
    modalBgColor: string;
    backgroundImg: string;
  }
}