import * as S from '@widgets/header/page-header.style';
import { useNavigate } from 'react-router-dom';

import Common from '@shared/styles/common';

import ArrowButton from '@shared/ui/button/arrow-button';

interface PageHeaderProps {
  title: string;
  date?: string;
  onBack?: () => void;
}

const PageHeader = ({ title, date, onBack }: PageHeaderProps) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    if (onBack) {
      onBack();
    }
    navigate(- 1);
  }
  return (
    <S.Header>
      <ArrowButton direction="left" size="md" color={Common.colors.white} onClick={handleGoBack} />
      <div>
        <S.Title>{title}</S.Title>
        <S.Date>{date}</S.Date>
      </div>
      <div />
    </S.Header>
  );
};

export default PageHeader;
