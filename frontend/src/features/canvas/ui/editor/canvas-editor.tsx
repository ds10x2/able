import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  addEdge,
  reconnectEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MarkerType,
  type OnConnect,
  type Connection,
  type Node as XYFlowNode,
  type Edge as XYFlowEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';

import * as S from '@features/canvas/ui/editor/canvas-editor.style';
import Common from '@shared/styles/common';
import { TOAST_MESSAGES } from '@features/canvas/constants/message.constant';
import { initialNodes, initialEdges } from '@features/canvas/model/initial-data';
import type { TrainConfig, TrainRequest } from '@features/canvas/types/train.type';
import {
  transformCanvasResponse,
  transformEdgesToEdgeSchema,
  transformNodesToBlockSchema,
} from '@features/canvas/utils/canvas-transformer.util';
import { isDataBlockConnected, isValidConnection } from '@features/canvas/utils/validators.util';
import { getConnectedStatus } from '@features/canvas/utils/visibility.util';
import { useProjectNameStore } from '@entities/project/model/project.model';
import { useFetchCanvas } from '@features/canvas/api/use-canvas.query';
import { useSaveCanvas } from '@features/canvas/api/use-canvas.mutation';
import { useStartTrain } from '@features/canvas/api/use-train.mutation';
import { useNodeDropHandler } from '@features/canvas/model/use-node-drop-handler.model';
import { useNodeChangeHandler } from '@features/canvas/model/use-node-change-handler.modle';
import { useEdgeChangeHandler } from '@features/canvas/model/use-edge-change-handler.model';
import { useCopyPaste } from '@features/canvas/model/use-copy-paste';

import BlockNode from '@entities/block-node/ui/block-node';
import BasicButton from '@shared/ui/button/basic-button';
import PlayIcon from '@icons/play.svg?react';
import SaveIcon from '@icons/save.svg?react';
import TrainModal from '@features/canvas/ui/modal/train-modal';

const CanvasEditor = () => {
  const { projectName } = useProjectNameStore();
  const { data } = useFetchCanvas(projectName || '');
  const { mutateAsync: saveCanvas } = useSaveCanvas();
  const { mutate: startTrain } = useStartTrain();

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<XYFlowNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleNodesChange } = useNodeChangeHandler({
    nodes,
    setNodes,
    selectedNode,
    setSelectedNode,
  });
  const { handleEdgesChange } = useEdgeChangeHandler({
    edges,
    setEdges,
    nodes,
    selectedNode,
  });
  useCopyPaste();

  const { screenToFlowPosition } = useReactFlow();
  const { dropRef } = useNodeDropHandler({ setNodes, screenToFlowPosition });
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  // 초기에 백엔드에서 캔버스 정보를 받아오면 노드와 엣지 상태를 업데이트
  useEffect(() => {
    if (data && !isUpdated) {
      const transformedData = transformCanvasResponse(data);
      setNodes(transformedData.nodes);
      setEdges(transformedData.edges);
    }
  }, [data, setNodes, setEdges, isUpdated]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRunButtonClick = () => {
    if (!isDataBlockConnected(nodes, edges)) {
      toast.error(TOAST_MESSAGES.data);
      return;
    }
    setIsModalOpen(true);
  };

  const handleTrain = (trainConfig: TrainConfig) => {
    const transformedBlocks = transformNodesToBlockSchema(nodes);
    const transformedEdges = transformEdgesToEdgeSchema(edges);

    const trainRequest: TrainRequest = {
      projectName: projectName || '',
      epoch: trainConfig.epoch ?? 0,
      batchSize: trainConfig.batchSize ?? 0,
      device: trainConfig.device,
      canvas: { blocks: transformedBlocks, edges: transformedEdges },
    };

    startTrain(trainRequest);
  };

  const handleSaveButtonClick = async () => {
    if (canvasRef.current) {
      const canvasImage = await html2canvas(canvasRef.current);
      const dataUrl = canvasImage.toDataURL('image/png');

      const transformedBlocks = transformNodesToBlockSchema(nodes);
      const transformedEdges = transformEdgesToEdgeSchema(edges);

      toast.promise(
        saveCanvas({
          projectName: projectName || '',
          canvas: { blocks: transformedBlocks, edges: transformedEdges },
          thumbnail: dataUrl,
        }),
        {
          loading: TOAST_MESSAGES.loading,
          success: TOAST_MESSAGES.success,
          error: TOAST_MESSAGES.error,
        }
      );

      setIsUpdated(true);

      return;
    }

    toast.error('캔버스가 준비되지 않았어요.');
  };

  // 노드를 연결할 때 호출
  const handleConnect: OnConnect = (connection) => {
    if (!isValidConnection(connection, nodes, edges)) return;

    // 사이클이 발생하지 않으면 엣지 추가
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          type: 'smoothstep',
          markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30 },
        },
        eds
      )
    );
  };

  const handleReconnect = useCallback(
    (oldEdge: XYFlowEdge, newConnection: Connection) => {
      if (!isValidConnection(newConnection, nodes, edges)) return;

      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    },
    [nodes, edges, setEdges]
  );

  const { fitView } = useReactFlow();

  useEffect(() => {
    const timer = setTimeout(() => {
      fitView();
    }, 100);

    return () => clearTimeout(timer);
  }, [fitView]);

  return (
    <>
      {isModalOpen && <TrainModal onClose={handleModalClose} onSubmit={handleTrain} />}
      <S.Canvas ref={canvasRef}>
        <ReactFlow
          ref={dropRef}
          nodes={nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              isConnected: getConnectedStatus(node.id, nodes, edges),
              isSelected: node.id === selectedNode?.id,
            },
          }))}
          edges={edges}
          fitView
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={handleConnect}
          onReconnect={handleReconnect}
          onNodeClick={(_, node) => setSelectedNode(node)}
          onPaneClick={() => setSelectedNode(null)}
          nodeTypes={{ custom: BlockNode }}
        >
          <div data-html2canvas-ignore="true">
            <Controls position="bottom-center" orientation="horizontal" />
          </div>
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
        <S.OverlayButton data-html2canvas-ignore="true">
          <BasicButton
            text="실행"
            icon={<PlayIcon width={13} height={16} />}
            width="5.5rem"
            onClick={handleRunButtonClick}
          />
          <BasicButton
            text="저장"
            color={Common.colors.primary}
            backgroundColor={Common.colors.secondary}
            icon={<SaveIcon />}
            width="5.5rem"
            onClick={handleSaveButtonClick}
          />
        </S.OverlayButton>
      </S.Canvas>
    </>
  );
};

export default CanvasEditor;
