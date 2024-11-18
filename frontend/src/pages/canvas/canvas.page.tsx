import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ReactFlowProvider } from '@xyflow/react';

import * as S from '@pages/canvas/canvas.style';
import { useProjectNameStore } from '@entities/project/model/project.model';

import CanvasSidebar from '@features/canvas/ui/sidebar/canvas-sidebar';
import CanvasEditor from '@features/canvas/ui/editor/canvas-editor';
import PageHeader from '@widgets/header/page-header';

const CanvasPage = () => {
  const { projectName } = useProjectNameStore();

  return (
    <DndProvider backend={HTML5Backend}>
      <ReactFlowProvider>
        <S.PageContainer>
          <PageHeader title={projectName} />
          <S.Content>
            <CanvasSidebar />
            <CanvasEditor />
          </S.Content>
        </S.PageContainer>
      </ReactFlowProvider>
    </DndProvider>
  );
};

export default CanvasPage;
