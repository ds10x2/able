import { Dispatch, SetStateAction, useCallback } from 'react';
import { applyNodeChanges, type NodeChange, Node as XYFlowNode } from '@xyflow/react';

import type { BlockItem } from '@features/canvas/types/block.type';

interface NodeChangeHandlerProps {
  nodes: XYFlowNode[];
  setNodes: Dispatch<SetStateAction<XYFlowNode[]>>;
  selectedNode: XYFlowNode | null;
  setSelectedNode: Dispatch<SetStateAction<XYFlowNode | null>>;
}

export const useNodeChangeHandler = ({ nodes, setNodes, setSelectedNode }: NodeChangeHandlerProps) => {
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => {
        const filteredChanges = changes.filter((change) => {
          if (change.type === 'remove' && 'id' in change) {
            const node = nds.find((node) => node.id === change.id);
            const data = node?.data as { block: BlockItem };
            return data?.block?.type !== 'data';
          }
          return true;
        });

        return applyNodeChanges(filteredChanges, nds);
      });

      // 노드가 변경될 때마다 선택된 노드 업데이트
      const selectedChange = changes.find((change) => change.type === 'select' && 'id' in change && change.selected);
      if (selectedChange && 'id' in selectedChange) {
        const selectedNode = nodes.find((node) => node.id === selectedChange.id) || null;
        setSelectedNode(selectedNode);
      }
    },
    [setNodes, nodes, setSelectedNode]
  );

  return { handleNodesChange };
};

export const useFeatureNodeChangeHandler = ({ nodes, setNodes, setSelectedNode }: NodeChangeHandlerProps) => {
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => {
        const filteredChanges = changes.filter((change) => {
          if (change.type === 'remove' && 'id' in change) {
            const node = nds.find((node) => node.id === change.id);
            const data = node?.data as { featureMap: string };

            // 단일 featureMap 이미지가 있는지 확인
            const hasImage = Boolean(data?.featureMap);
            return hasImage;
          }
          return true;
        });

        return applyNodeChanges(filteredChanges, nds);
      });

      // 노드가 변경될 때마다 선택된 노드 업데이트
      const selectedChange = changes.find((change) => change.type === 'select' && 'id' in change && change.selected);
      if (selectedChange && 'id' in selectedChange) {
        const selectedNode = nodes.find((node) => node.id === selectedChange.id) || null;
        setSelectedNode(selectedNode);
      }
    },
    [setNodes, nodes, setSelectedNode]
  );

  return { handleNodesChange };
};
