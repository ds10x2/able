import { Position } from '@xyflow/react';

import { Direction } from '@features/train/types/algorithm.type';

export function getSourceHandlePosition(direction: Direction) {
  switch (direction) {
    case 'TB':
      return Position.Bottom;
    case 'LR':
      return Position.Right;
  }
}

export function getTargetHandlePosition(direction: Direction) {
  switch (direction) {
    case 'TB':
      return Position.Top;
    case 'LR':
      return Position.Left;
  }
}

export function getId() {
  return `${Date.now()}`;
}
