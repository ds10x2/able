import { css } from '@emotion/react';

// 스크롤바 디자인 숨기기
export const scrollbarHiddenMixin = css`
  &::-webkit-scrollbar {
    width: 0; /* 웹킷 브라우저에서 스크롤바 너비를 0으로 설정하여 숨김 */
    background: transparent;
  }

  /* Firefox의 경우 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 제거 */
  -ms-overflow-style: none; /* IE와 Edge에서 스크롤바 제거 */
`;

// 말줄임표
export const ellipsisMixin = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
