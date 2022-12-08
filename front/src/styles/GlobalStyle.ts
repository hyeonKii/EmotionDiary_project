import { createGlobalStyle } from "styled-components";
import DiaryFont from "@/assets/fonts/EF_Diary.ttf";

export const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: "diary";
      src: url(${DiaryFont}) format("truetype");
    }

    @font-face {
      font-family: 'NanumSquareNeo-Variable';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }

    * {
      box-sizing: border-box;
      
      margin: 0;
      padding: 0;

      font-family: "NanumSquareNeo-Variable";
    }

    button {
      border: 0;
      background: 0;

      cursor: pointer;
    }
`;
