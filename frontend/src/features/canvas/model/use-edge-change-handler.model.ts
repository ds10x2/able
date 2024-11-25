import { applyEdgeChanges, type EdgeChange, type Node as XYFlowNode, type Edge as XYFlowEdge } from '@xyflow/react';
import { Dispatch, SetStateAction, useCallback } from 'react';

import type { BlockItem } from '@features/canvas/types/block.type';

interface EdgeChangeHandlerProps {
  edges: XYFlowEdge[];
  setEdges: Dispatch<SetStateAction<XYFlowEdge[]>>;
  nodes: XYFlowNode[];
  selectedNode: XYFlowNode | null;
}

export const useEdgeChangeHandler = ({ setEdges, nodes, selectedNode }: EdgeChangeHandlerProps) => {
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => {
        const filteredChanges = changes.filter((change) => {
          if (change.type === 'remove' && selectedNode) {
            const sourceNode = nodes.find((node) => node.id === selectedNode.id);
            const data = sourceNode?.data as { block: BlockItem };
            // 현재 선택된 노드가 data 타입일 경우 해당 노드와 연결된 엣지는 삭제 불가
            if (data?.block?.type === 'data') {
              const edge = eds.find((edge) => edge.id === change.id);
              if (edge && (edge.source === selectedNode.id || edge.target === selectedNode.id)) {
                return false;
              }
            }
          }
          return true;
        });

        return applyEdgeChanges(filteredChanges, eds);
      });
    },
    [setEdges, nodes, selectedNode]
  );

  return { handleEdgesChange };
};
