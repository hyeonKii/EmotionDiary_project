import { createGlobalStyle } from "styled-components";
import DiaryFont from "@/assets/fonts/EF_Diary.ttf";

export const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: "diary";
      src: url(${DiaryFont}) format("truetype");
    }

    * {
      box-sizing: border-box;
      
      margin: 0;
      padding: 0;
    }

    button {
      border: 0;
      background: 0;

      cursor: pointer;
    }
`;
