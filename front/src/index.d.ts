import "styled-components";

declare module "*.jpg";
declare module "*.ttf";
declare module "*.png";
declare module "*.gif";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        navColor: string;
        textColor: string;
        spanColor: string;
        modalBgColor: string;
        inputBgColor: string;
        textAreaBgColor: string;
        backgroundImg: string;
        homeBgColor: string;
    }
}
