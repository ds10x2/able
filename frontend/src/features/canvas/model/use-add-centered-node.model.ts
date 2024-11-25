import type { Node as XYFlowNode } from '@xyflow/react';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { BlockItem } from '@features/canvas/types/block.type';

interface ClientOffset {
  x: number;
  y: number;
}

interface AddNodeProps {
  setNodes: Dispatch<SetStateAction<XYFlowNode[]>>;
  screenToFlowPosition: (position: { x: number; y: number }) => {
    x: number;
    y: number;
  };
}

// 노드가 마우스 커서 중앙에 위치하도록 새 노드 추가
export const useAddCenteredNode = ({ setNodes, screenToFlowPosition }: AddNodeProps) => {
  // 주어진 노드의 위치를 중앙으로 이동시키는 작업 수행
  // useCallback으로 캐싱
  const adjustNodePosition = useCallback(
    (nodeId: string, clientOffset: ClientOffset) => {
      // 비동기적으로 실행
      // -> 노드가 DOM에 추가된 후에 위치 계산
      setTimeout(() => {
        // nodeId에 해당하는 DOM 요소 찾기
        const element = document.querySelector(`[data-id="${nodeId}"]`);
        if (element) {
          const { width, height } = element.getBoundingClientRect();
          // 중앙 위치 계산
          // screenToFlowPosition: 함수의 중앙 좌표를 XYFlow 좌표계로 변환
          const centeredPosition = screenToFlowPosition({
            x: clientOffset.x - width / 2,
            y: clientOffset.y - height / 2,
          });

          setNodes((nds) => nds.map((node) => (node.id === nodeId ? { ...node, position: centeredPosition } : node)));
        }
      }, 0);
    },
    [screenToFlowPosition, setNodes]
  );

  // 새로운 노드 추가 및 위치 조정 로직
  return useCallback(
    // clientOffset: 마우스 커서의 현재 위치
    (clientOffset: ClientOffset, item: BlockItem) => {
      // 초기 위치 설정
      const initialPosition = screenToFlowPosition({
        x: clientOffset.x,
        y: clientOffset.y,
      });

      // 추가할 새 노드 정의
      const newNode: XYFlowNode = {
        id: uuidv4(),
        type: 'custom',
        position: initialPosition,
        data: {
          block: item,
        },
      };

      setNodes((nds) => [...nds, newNode]);

      // 중앙 위치 조정 후 갱신
      adjustNodePosition(newNode.id, clientOffset);
    },
    [screenToFlowPosition, setNodes, adjustNodePosition]
  );
};
