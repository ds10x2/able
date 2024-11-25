import { useDrop } from 'react-dnd';
import type { Node as XYFlowNode } from '@xyflow/react';
import { Dispatch, SetStateAction } from 'react';

import type { BlockItem } from '@features/canvas/types/block.type';
import { useAddCenteredNode } from '@features/canvas/model/use-add-centered-node.model';

interface DropHandlerParams {
  setNodes: Dispatch<SetStateAction<XYFlowNode[]>>;
  screenToFlowPosition: (position: { x: number; y: number }) => {
    x: number;
    y: number;
  };
}

// 드래그한 블록을 캔버스에 드롭할 때, 해당 위치에 노드를 추가하고 중앙으로 위치 조정하는 함수
export const useNodeDropHandler = ({ setNodes, screenToFlowPosition }: DropHandlerParams) => {
  // 새 노드 추가 및 마우스 커서 중앙에 위치하도록 조정하는 함수 호출
  const addCenteredNode = useAddCenteredNode({
    setNodes,
    screenToFlowPosition,
  });

  // 드롭 영역 설정
  const [, dropRef] = useDrop(() => ({
    accept: 'BLOCK',
    drop: (item: BlockItem, monitor) => {
      // 현재 마우스 커서 위치 가져오기
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        addCenteredNode(clientOffset, item);
      }
    },
  }));

  // 드롭 영역으로 설정된 ref 객체 반환
  return { dropRef };
};
