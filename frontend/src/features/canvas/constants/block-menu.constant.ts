import TransformIcon from '@icons/transform.svg?react';
import LayerIcon from '@icons/layer.svg?react';
import ActivationIcon from '@icons/activation.svg?react';
import LossIcon from '@icons/loss.svg?react';
import OperationIcon from '@icons/operation.svg?react';
import OptimizerIcon from '@icons/optimizer.svg?react';
import ModuleIcon from '@icons/module.svg?react';

export const BLOCK_MENU = [
  {
    name: 'transform',
    icon: TransformIcon,
    color: '#FF686B',
  },
  {
    name: 'layer',
    icon: LayerIcon,
    color: '#34D399',
  },
  {
    name: 'activation',
    icon: ActivationIcon,
    color: '#71D334',
  },
  {
    name: 'loss',
    icon: LossIcon,
    color: '#EE74B5',
  },
  {
    name: 'operation',
    icon: OperationIcon,
    color: '#A768FF',
  },
  {
    name: 'optimizer',
    icon: OptimizerIcon,
    color: '#FFD00D',
  },
  {
    name: 'module',
    icon: ModuleIcon,
    color: '#30AEF7',
  },
] as const;
