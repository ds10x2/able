import { Handle, Position, useReactFlow } from '@xyflow/react';
import { memo, useMemo, useState } from 'react';

import * as S from '@entities/block-node/ui/block-node.style';
import Common from '@shared/styles/common';
import { BLOCK_COLORS } from '@shared/constants/block';
import type { BlockItem } from '@features/canvas/types/block.type';
import { capitalizeFirstLetter } from '@shared/utils/formatters.util';

import ArrowButton from '@shared/ui/button/arrow-button';

interface BlockNodeProps {
  id: string;
  data: {
    block: BlockItem;
    isConnected?: boolean;
    isSelected?: boolean;
  };
  sourcePosition?: Position;
  targetPosition?: Position;
}

const BlockNode = ({
  id,
  data: { block, isConnected = false, isSelected = false },
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
}: BlockNodeProps) => {
  const { updateNodeData } = useReactFlow();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const blockColor = useMemo(() => (block?.type ? BLOCK_COLORS[block.type] : Common.colors.gray200), [block.type]);

  const handleFieldChange = (fieldName: string, value: string | boolean) => {
    const updatedFields = block.fields.map((f) => (f.name === fieldName ? { ...f, value } : f));
    updateNodeData(id, { block: { ...block, fields: updatedFields } });
  };

  const requiredFields = block.fields.filter((field) => field.isRequired);
  const visibleFields = isOpen ? block.fields : requiredFields;

  return (
    <S.Container blockColor={blockColor} isConnected={isConnected} isSelected={isSelected}>
      <Handle type="target" position={targetPosition} />
      <S.Label>
        <span>{capitalizeFirstLetter(block?.name || 'Unknown')}</span>
        <ArrowButton
          color={Common.colors.white}
          direction={isOpen ? 'up' : 'down'}
          onClick={() => setIsOpen(!isOpen)}
        />
      </S.Label>
      <S.FieldWrapper>
        {visibleFields.map((field) => (
          <S.InputWrapper key={field.name} blockColor={blockColor}>
            <S.Name>
              {field.name} {field.isRequired ? '*' : ''}
            </S.Name>
            {typeof field.value === 'boolean' ? (
              <S.Checkbox
                type="checkbox"
                blockColor={blockColor}
                checked={field.value}
                onChange={(e) => handleFieldChange(field.name, e.target.checked)}
              />
            ) : (
              <S.Input
                type="text"
                required={field.isRequired}
                value={field.value ?? ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
              />
            )}
          </S.InputWrapper>
        ))}
      </S.FieldWrapper>
      <Handle type="source" position={sourcePosition} />
    </S.Container>
  );
};

export default memo(BlockNode);
