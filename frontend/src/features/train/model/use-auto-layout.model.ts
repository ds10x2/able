import { useEffect } from 'react';
import { type Node, type Edge, useReactFlow, useNodesInitialized, useStore } from '@xyflow/react';

import { getSourceHandlePosition, getTargetHandlePosition } from '@features/train/utils/auto-layout.util';
import layoutAlgorithms from '@features/train/types/algorithm.type';

export type LayoutOptions = {
  direction: 'TB' | 'LR' | 'NOT';
};

function useAutoLayout(options: LayoutOptions) {
  const { setNodes, setEdges } = useReactFlow();
  const nodesInitialized = useNodesInitialized();
  const elements = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    compareElements
  );

  useEffect(() => {
    if (!nodesInitialized || elements.nodes.length === 0) {
      return;
    }
    const runLayout = async () => {
      const layoutAlgorithm = layoutAlgorithms['d3-hierarchy']; // 알고리즘 고정
      const nodes = elements.nodes.map((node) => ({ ...node }));
      const edges = elements.edges.map((edge) => ({ ...edge }));

      const { nodes: nextNodes, edges: nextEdges } = await layoutAlgorithm(nodes, edges, {
        spacing: [50, 50],
        direction: options.direction,
      });

      for (const node of nextNodes) {
        node.style = { ...node.style, opacity: 1 };
        node.sourcePosition = getSourceHandlePosition(options.direction);
        node.targetPosition = getTargetHandlePosition(options.direction);
      }

      for (const edge of edges) {
        edge.style = { ...edge.style, opacity: 1 };
      }

      setNodes(nextNodes);
      setEdges(nextEdges);
    };

    if (options.direction !== 'NOT') {
      runLayout();
    }
    return;
  }, [nodesInitialized, elements, options.direction, setNodes, setEdges]);
}

export default useAutoLayout;

type Elements = {
  nodes: Array<Node>;
  edges: Array<Edge>;
};

function compareElements(xs: Elements, ys: Elements) {
  return compareNodes(xs.nodes, ys.nodes) && compareEdges(xs.edges, ys.edges);
}

function compareNodes(xs: Array<Node>, ys: Array<Node>) {
  if (xs.length !== ys.length) return false;

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i];
    const y = ys[i];

    if (!y) return false;
    if (x.resizing || x.dragging) return true;
    if (x.measured?.width !== y.measured?.width || x.measured?.height !== y.measured?.height) {
      return false;
    }
  }

  return true;
}

function compareEdges(xs: Array<Edge>, ys: Array<Edge>) {
  if (xs.length !== ys.length) return false;

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i];
    const y = ys[i];

    if (x.source !== y.source || x.target !== y.target) return false;
    if (x?.sourceHandle !== y?.sourceHandle) return false;
    if (x?.targetHandle !== y?.targetHandle) return false;
  }

  return true;
}
