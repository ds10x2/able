import type { Block } from '@features/canvas/types/block.type';
import { Node as XYFlowNode, Edge as XYFlowEdge } from '@xyflow/react';

export interface EdgeSchema {
  id: string;
  source: string;
  target: string;
}

export interface BlockSchema extends Block {
  id: string;
  position: string;
}

export interface CanvasSchema {
  canvas: { blocks: BlockSchema[]; edges: EdgeSchema[] };
}

export interface TransformedCanvas {
  nodes: XYFlowNode[];
  edges: XYFlowEdge[];
}
