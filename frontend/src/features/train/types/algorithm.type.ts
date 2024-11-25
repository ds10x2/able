import { type Node, type Edge } from '@xyflow/react';

import d3Hierarchy from '@features/train/utils/d3-hierarchy.util';

export type Direction = 'TB' | 'LR' | 'NOT';

export type LayoutAlgorithmOptions = {
  direction: Direction;
  spacing: [number, number];
};

export type LayoutAlgorithm = (
  nodes: Node[],
  edges: Edge[],
  options: LayoutAlgorithmOptions
) => Promise<{ nodes: Node[]; edges: Edge[] }>;

export default {
  'd3-hierarchy': d3Hierarchy,
};
