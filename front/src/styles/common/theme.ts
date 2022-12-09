import { DefaultTheme } from "styled-components";
import background from "@/assets/images/background.jpg";
import backgroundDark from "@/assets/images/background_dark.jpg";

export const lightTheme: DefaultTheme = {
    bgColor: "#FCF8E8",
    homeBgColor: "#FFFFFF",
    navColor: "#FFFFFF",

    textColor: "#000000",
    spanColor: "#000000",

    modalBgColor: "#FFFFFF",
    inputBgColor: "#FFFFFF",
    textAreaBgColor: "#f0f0f0",

    backgroundImg: `${background}`,
};

export const darkTheme: DefaultTheme = {
    bgColor: "#2f3640",
    homeBgColor: "#2f3640",
    navColor: "#2f3640",

    textColor: "#FFFFFF",
    spanColor: "#000000",

    modalBgColor: "#2f3640",
    inputBgColor: "#242a30",
    textAreaBgColor: "#242a30",

    backgroundImg: `${backgroundDark}`,
};
