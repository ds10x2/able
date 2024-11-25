import * as S from '@/pages/home/home.style';

import HomeHeader from '@features/home/ui/header/home-header';
import HomeSideBar from '@features/home/ui/sidebar/home-sidebar';
import HomeContent from '@/features/home/ui/content/home-content';

const HomePage = () => {
  return (
    <S.PageLayout>
      <HomeHeader />
      <S.PageContainer>
        <HomeSideBar />
        <S.ContentContainer>
          <HomeContent />
        </S.ContentContainer>
      </S.PageContainer>
    </S.PageLayout>
  );
};

export default HomePage;
