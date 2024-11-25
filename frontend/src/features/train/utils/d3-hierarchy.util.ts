import { type Node, getIncomers } from '@xyflow/react';
import { type HierarchyPointNode, stratify, tree } from 'd3-hierarchy';

import type { LayoutAlgorithm, Direction } from '@features/train/types/algorithm.type';

const getPosition = (x: number, y: number, direction: Direction) => {
  switch (direction) {
    case 'TB':
      return { x, y };
    case 'LR':
      return { x: y, y: x };
  }
};

type NodeWithPosition = Node & { x: number; y: number };

const layout = tree<NodeWithPosition>().separation(() => 1);

const rootNode = {
  id: 'd3-hierarchy-root',
  x: 0,
  y: 0,
  position: { x: 0, y: 0 },
  data: {},
};

const d3HierarchyLayout: LayoutAlgorithm = async (nodes, edges, options) => {
  const isHorizontal = options.direction === 'LR';

  const initialNodes = [] as NodeWithPosition[];
  let maxNodeWidth = 0;
  let maxNodeHeight = 0;

  for (const node of nodes) {
    const nodeWithPosition = { ...node, ...node.position };

    initialNodes.push(nodeWithPosition);
    maxNodeWidth = Math.max(maxNodeWidth, node.measured?.width ?? 0);
    maxNodeHeight = Math.max(maxNodeHeight, node.measured?.height ?? 0);
  }

  const nodeSize = isHorizontal
    ? [maxNodeHeight + options.spacing[1], maxNodeWidth + options.spacing[0]]
    : [maxNodeWidth + options.spacing[0], maxNodeHeight + options.spacing[1]];
  layout.nodeSize(nodeSize as [number, number]);

  const getParentId = (node: Node) => {
    if (node.id === rootNode.id) {
      return undefined;
    }

    const incomers = getIncomers(node, nodes, edges);

    return incomers[0]?.id || rootNode.id;
  };

  const hierarchy = stratify<NodeWithPosition>()
    .id((d) => d.id)
    .parentId(getParentId)([rootNode, ...initialNodes]);

  const root = layout(hierarchy);
  const layoutNodes = new Map<string, HierarchyPointNode<NodeWithPosition>>();
  for (const node of root) {
    layoutNodes.set(node.id!, node);
  }

  const nextNodes = nodes.map((node) => {
    const { x, y } = layoutNodes.get(node.id)!;
    const position = getPosition(x, y, options.direction);
    const offsetPosition = {
      x: (position?.x ?? 0) - (node.measured?.width ?? 0) / 2,
      y: (position?.y ?? 0) - (node.measured?.height ?? 0) / 2,
    };

    return { ...node, position: offsetPosition };
  });

  return { nodes: nextNodes, edges };
};

export default d3HierarchyLayout;
