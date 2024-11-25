import { css } from '@emotion/react';

import Common from '@shared/styles/common';

export const globalStyle = css`
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/PretendardVariable.woff2') format('woff2-variations');
    font-weight: 400 600;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body,
  button,
  input {
    font-family: 'Pretendard', sans-serif;
    color: ${Common.colors.black};
  }

  /* 스크롤바 기본 스타일 */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  /* 스크롤바 트랙 스타일 */
  ::-webkit-scrollbar-track {
    background-color: ${Common.colors.gray200}; /* 트랙 배경색 */
    border-radius: 10px;
  }

  /* 스크롤바 핸들(움직이는 부분) 스타일 */
  ::-webkit-scrollbar-thumb {
    background-color: ${Common.colors.secondary}; /* 핸들 색상 */
    border-radius: 10px;
  }
`;
