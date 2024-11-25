import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Container, Content, MainContainer } from '@pages/train/train.style';
import { useProjectNameStore } from '@entities/project/model/project.model';
import { useImageStore } from '@entities/train/model/train.model';

import Sidebar from '@widgets/sidebar/project-sidebar';
import AnalyzeComponent from '@features/train/ui/analyze/analyze';
import ResultComponent from '@features/train/ui/result/result';
import PageHeader from '@widgets/header/page-header';

const TrainPage = () => {
  const location = useLocation();
  const date = location.state.date;
  const { projectName } = useProjectNameStore();
  const [selectedComponent, setSelectedComponent] = useState('result');
  const { resetImage } = useImageStore();

  const handleSidebarSelection = (selection: string) => {
    setSelectedComponent(selection);
  };

  return (
    <MainContainer>
      <PageHeader title={projectName} date={date} onBack={resetImage} />
      <Container>
        <Sidebar onSelectionChange={handleSidebarSelection} type="train" />
        <Content>
          {selectedComponent === 'analyze' && <AnalyzeComponent />}
          {selectedComponent === 'result' && <ResultComponent />}
        </Content>
      </Container>
    </MainContainer>
  );
};

export default TrainPage;
