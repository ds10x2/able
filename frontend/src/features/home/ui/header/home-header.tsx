import * as S from '@features/home/ui/header/home-header.style';

import Logo from '@assets/images/logo.png';

const HomeHeader = () => {
  const landingUrl = 'http://k11a305.p.ssafy.io:3000';

  return (
    <S.Header>
      <S.Logo src={Logo} alt="logo"></S.Logo>
      <S.RightText href={landingUrl} target="_blank" rel="noopener noreferrer">
        docs
      </S.RightText>
    </S.Header>
  );
};

export default HomeHeader;
