import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Node,
  useKeyPress,
  useReactFlow,
  getConnectedEdges,
  Edge,
  XYPosition,
  useStore,
  type KeyCode,
} from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

import type { BlockItem } from '@features/canvas/types/block.type';

export const useCopyPaste = <NodeType extends Node = Node, EdgeType extends Edge = Edge>() => {
  // 현재 마우스 위치 저장 (붙여넣기 시 마우스 위치를 기준으로 노드 배치)
  const mousePosRef = useRef<XYPosition>({ x: 0, y: 0 });
  // React Flow의 Dom 노드 가져오기
  const rfDomNode = useStore((state) => state.domNode);

  const { getNodes, setNodes, getEdges, setEdges, screenToFlowPosition } = useReactFlow<NodeType, EdgeType>();

  // 복사한 노드/엣지를 저장하기 위한 노드 배열/엣지 배열
  const [bufferedNodes, setBufferedNodes] = useState([] as NodeType[]);
  const [bufferedEdges, setBufferedEdges] = useState([] as EdgeType[]);

  useEffect(() => {
    // native 이벤트(cut, copy, paste)를 막고, React Flow의 커스텀 동작을 수행하기 위해 설정
    const events = ['cut', 'copy', 'paste'];

    if (rfDomNode) {
      const preventDefault = (e: Event) => e.preventDefault(); // 기본 동작 막기

      // 마우스 이동 이벤트 (현재 마우스 위치 저장)
      const onMouseMove = (event: MouseEvent) => {
        mousePosRef.current = {
          x: event.clientX,
          y: event.clientY,
        };
      };

      // 이벤트 핸들러를 React Flow DOM 노드에 추가
      for (const event of events) {
        rfDomNode.addEventListener(event, preventDefault);
      }

      rfDomNode.addEventListener('mousemove', onMouseMove);

      // 컴포넌트 언마운트 시 이벤트 핸들러 제거
      return () => {
        for (const event of events) {
          rfDomNode.removeEventListener(event, preventDefault);
        }

        rfDomNode.removeEventListener('mousemove', onMouseMove);
      };
    }
  }, [rfDomNode]);

  // 복사하기
  const copy = useCallback(() => {
    // 선택된 노드와 관련 엣지를 가져와 bufferedNodes/bufferedEdges에 저장
    // getConnectedEdges: 선택된 노드와 연결된 엣지 찾기
    const selectedNodes = getNodes().filter((node) => node.selected);
    console.log(selectedNodes);

    // data 블록은 복사 불가
    if (selectedNodes.some((node) => (node.data?.block as BlockItem).type === 'data')) {
      toast.error('Data 블록은 하나만 존재해요.');
      return;
    }

    const selectedEdges = getConnectedEdges(selectedNodes, getEdges()).filter((edge) => {
      const isExternalSource = selectedNodes.every((n) => n.id !== edge.source);
      const isExternalTarget = selectedNodes.every((n) => n.id !== edge.target);

      return !(isExternalSource || isExternalTarget);
    });

    setBufferedNodes(selectedNodes);
    setBufferedEdges(selectedEdges);
  }, [getNodes, getEdges]);

  // 잘라내기
  const cut = useCallback(() => {
    // copy 동작과 유사
    const selectedNodes = getNodes().filter((node) => node.selected);

    // data 블록은 복사 불가
    if (selectedNodes.some((node) => (node.data?.block as BlockItem).type === 'data')) {
      toast.error('Data 블록은 하나만 존재해요.');
      return;
    }
    const selectedEdges = getConnectedEdges(selectedNodes, getEdges()).filter((edge) => {
      const isExternalSource = selectedNodes.every((n) => n.id !== edge.source);
      const isExternalTarget = selectedNodes.every((n) => n.id !== edge.target);

      return !(isExternalSource || isExternalTarget);
    });

    setBufferedNodes(selectedNodes);
    setBufferedEdges(selectedEdges);

    // 선택된 노드/엣지 삭제
    setNodes((nodes) => nodes.filter((node) => !node.selected));
    setEdges((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));
  }, [getNodes, setNodes, getEdges, setEdges]);

  // 붙여넣기
  const paste = useCallback(
    (
      { x: pasteX, y: pasteY } = screenToFlowPosition({
        x: mousePosRef.current.x,
        y: mousePosRef.current.y,
      })
    ) => {
      // 붙여넣을 위치(pasteX, pasteY) 계산
      // minX, minY: 복사된 노드의 최상단 좌표를 기준으로 이동
      const minX = Math.min(...bufferedNodes.map((s) => s.position.x));
      const minY = Math.min(...bufferedNodes.map((s) => s.position.y));

      const now = Date.now();

      const newNodes: NodeType[] = bufferedNodes.map((node) => {
        const id = uuidv4();
        const x = pasteX + (node.position.x - minX);
        const y = pasteY + (node.position.y - minY);

        return { ...node, id, position: { x, y } };
      });

      // 새 노드/엣지 배열 생성
      const newEdges: EdgeType[] = bufferedEdges.map((edge) => {
        const id = uuidv4();
        const source = `${edge.source}-${now}`;
        const target = `${edge.target}-${now}`;

        return { ...edge, id, source, target };
      });

      setNodes((nodes) => [...nodes.map((node) => ({ ...node, selected: false })), ...newNodes]);
      setEdges((edges) => [...edges.map((edge) => ({ ...edge, selected: false })), ...newEdges]);
    },
    [bufferedNodes, bufferedEdges, screenToFlowPosition, setNodes, setEdges]
  );

  useShortcut(['Meta+x', 'Control+x'], cut);
  useShortcut(['Meta+c', 'Control+c'], copy);
  useShortcut(['Meta+v', 'Control+v'], paste);

  return { cut, copy, paste, bufferedNodes, bufferedEdges };
};

const useShortcut = (keyCode: KeyCode, callback: () => void): void => {
  const [didRun, setDidRun] = useState(false);
  const shouldRun = useKeyPress(keyCode); // 특정 키가 눌렸는지 감지

  // 키 입력 이벶ㄴ트가 발생하면 callback 실행
  useEffect(() => {
    if (shouldRun && !didRun) {
      callback();
      setDidRun(true);
    } else {
      setDidRun(shouldRun);
    }
  }, [shouldRun, didRun, callback]);
};

export default useCopyPaste;
