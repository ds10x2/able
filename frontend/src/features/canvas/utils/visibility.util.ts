import { getOutgoers, type Node as XYFlowNode, type Edge as XYFlowEdge } from '@xyflow/react';

import { DATA_BLOCK_ID } from '@features/canvas/constants/block.constant';

export const getConnectedStatus = (nodeId: string, nodes: XYFlowNode[], edges: XYFlowEdge[]) => {
  const dataDescendants = getDataBlockDescendants(DATA_BLOCK_ID, nodes, edges);
  return dataDescendants.has(nodeId);
};

// 데이터 블록이거나 그 자식인지 확인
// 미사용한 블록은 투명도를 낮게 보여주기 위함
const getDataBlockDescendants = (dataBlockId: string, nodes: XYFlowNode[], edges: XYFlowEdge[]): Set<string> => {
  const visited = new Set<string>([dataBlockId]);

  // 데이터 블록의 모든 자식 노드를 탐색하는 재귀 함수
  const traverse = (currentId: string) => {
    const currentNode = nodes.find((node) => node.id === currentId);
    if (!currentNode) return;

    const outgoers = getOutgoers(currentNode, nodes, edges);
    outgoers.forEach((outgoer) => {
      if (!visited.has(outgoer.id)) {
        visited.add(outgoer.id);
        traverse(outgoer.id);
      }
    });
  };

  traverse(dataBlockId);
  return visited;
};
