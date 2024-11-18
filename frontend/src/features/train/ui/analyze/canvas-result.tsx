import {
  ReactFlow,
  MarkerType,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  useReactFlow,
  type Node as XYFlowNode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

import useAutoLayout, { type LayoutOptions } from '@features/train/model/use-auto-layout.model';
import { useHeatMap, useModel } from '@features/train/api/use-analyze.query';
import { useProjectNameStore } from '@entities/project/model/project.model';
import { useImageStore } from '@entities/train/model/train.model';
import { useFetchFeatureMap, useCreateFeatureMap } from '@features/train/api/use-analyze.mutation';
import { useFeatureNodeChangeHandler } from '@features/canvas/model/use-node-change-handler.modle';
import { initialNodes, initialEdges } from '@features/canvas/model/initial-data';
import { useAnalyze } from '@entities/project/model/project.model'

import {
  PositionedButton,
  LayoutPosition,
  Divider,
  Button,
  LayoutIcon,
} from '@features/train/ui/analyze/canvas-result.style';
import BasicButton from '@shared/ui/button/basic-button';
import PlayIcon from '@icons/play.svg?react';
import BlockNodeFeature from '@entities/block-node/ui/block-node-feature';
import DeviceSelectModal from '@features/train/ui/modal/device-select-modal';

const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
};

const defaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed },
  pathOptions: { offset: 15 },
  animated: true,
};

const CanvasResult = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [direction, setDirection] = useState<LayoutOptions['direction']>('NOT');
  const [selectedNode, setSelectedNode] = useState<XYFlowNode | null>(null);
  const [defaultSetting, setDefaultSetting] = useState(true);
  const { setCurrentDirection } = useAnalyze();

  const { projectName, resultName, epochName } = useProjectNameStore();
  const { uploadedImage, heatMapId, setHeatMapId, heatmapImage, setAllImage, resetImage } = useImageStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: canvas } = useModel(projectName, resultName);
  const { data: heatMap } = useHeatMap(projectName, resultName, epochName);
  const { mutate: fetchCreateModel } = useCreateFeatureMap();
  const { mutate: fetchFeatureMap } = useFetchFeatureMap();

  const { handleNodesChange } = useFeatureNodeChangeHandler({
    nodes,
    setNodes,
    selectedNode,
    setSelectedNode,
  });

  useAutoLayout({ direction });

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRunButtonClick = () => {
    if (!epochName) {
      toast.error('추론할 epoch를 선택해 주세요.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCreateModel = (deviceIndex: number) => {
    if (deviceIndex === null) {
      toast.error('학습 장치를 선택해 주세요.');
      return;
    }
    fetchCreateModel(
      {
        projectName,
        resultName,
        epochName,
        deviceIndex,
        image: uploadedImage,
      },
      {
        onSuccess: () => {
          toast.success('추론에 성공했어요.');
          handleFieldChange(heatMapId, heatmapImage || '');
        },
        onError: () => {
          toast.error('추론에 실패했어요.');
        },
      }
    );
  };

  const handleNodeClick = (blockId: string) => {
    setDefaultSetting(false);

    if (blockId === '0') {
      return;
    }

    fetchFeatureMap(
      {
        projectName,
        resultName,
        epochName,
        blockIds: blockId,
      },
      {
        onSuccess: (data) => {
          if (data) {
            handleFieldChange(blockId, data);
          }
        },
      }
    );
  };

  const handleFieldChange = useCallback(
    (nodeId: string, image: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? {
              ...node,
              data: {
                ...node.data,
                featureMap: image,
              },
            }
            : node
        )
      );
    },
    [setNodes]
  );

  const handleLayoutChange = (newDirection: LayoutOptions['direction']) => {
    setDefaultSetting(true);
    setDirection(newDirection);
    setCurrentDirection(newDirection);
  };

  useEffect(() => {
    if (canvas) {
      const { blocks, edges } = canvas.canvas;

      const newNodes = blocks.map((block) => ({
        id: block.id,
        type: 'custom',
        position: JSON.parse(block.position),
        data: { block, featureMap: '' },
      }));

      const newEdges = edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        ...defaultEdgeOptions,
      }));

      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [canvas, setNodes, setEdges, setHeatMapId]);

  useEffect(() => {
    if (canvas && heatMap && nodes.length > 0) {
      const firstNodeId = nodes[0].id;

      setHeatMapId(heatMap.heatmapBlockId);
      setAllImage({
        uploadedImage: heatMap.originalImg,
        heatmapImage: heatMap.heatmapImg,
        classScores: heatMap.classScores,
      });

      handleFieldChange(firstNodeId, heatMap.originalImg);
      handleFieldChange(heatMapId, heatMap.heatmapImg);
    } else if (!heatMap) {
      resetImage();
    }
  }, [canvas, heatMap]);

  const { fitView } = useReactFlow();

  useEffect(() => {
    if (defaultSetting) {
      fitView();
    }
  }, [fitView, direction, nodes]);


  return (
    <>
      {isModalOpen && <DeviceSelectModal onClose={handleModalClose} onSubmit={handleCreateModel} />}
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            onFieldChange: (img: string) => handleFieldChange(node.id, img),
          },
        }))}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => {
          setSelectedNode(node);
          handleNodeClick(node.id);
        }}
        nodesDraggable={false}
        nodesConnectable={false}
        attributionPosition="bottom-left"
        nodeTypes={{ custom: BlockNodeFeature }}
        proOptions={proOptions}
        zoomOnDoubleClick={false}
      >
        <Background variant={BackgroundVariant.Dots} />
        <PositionedButton>
          <BasicButton
            text="추론하기"
            icon={<PlayIcon width={13} height={15} />}
            width="10rem"
            onClick={handleRunButtonClick}
          />
        </PositionedButton>
        <LayoutPosition>
          <Button onClick={() => handleLayoutChange('TB')}>
            <LayoutIcon rotate={0} width={22} height={22} />
          </Button>
          <Divider />
          <Button onClick={() => handleLayoutChange('LR')}>
            <LayoutIcon rotate={-90} width={22} height={22} />
          </Button>
        </LayoutPosition>
      </ReactFlow>
    </>
  );
};

const WrappedCanvasResult = () => (
  <ReactFlowProvider>
    <CanvasResult />
  </ReactFlowProvider>
);

export default WrappedCanvasResult;
