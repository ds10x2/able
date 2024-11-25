import { ReactNode } from 'react';

import * as S from '@shared/ui/modal/modal.style';

import ModalPortal from '@shared/ui/modal/modal-portal';

interface ModalProps {
  onClose: () => void;
  onDelete?: () => void;
  onConfirm?: () => void;
  title: string;
  children: ReactNode;
  cancelText?: string;
  confirmText?: string;
  isDelete?: boolean;
}

const Modal = ({
  onClose,
  onDelete,
  onConfirm,
  title,
  children,
  cancelText = '취소',
  confirmText = '확인',
  isDelete = false,
}: ModalProps) => (
  <ModalPortal>
    <S.ModalOverlay onClick={onClose}>
      <S.ModalWrapper onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.Title>{title}</S.Title>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        </S.ModalHeader>
        <S.ModalBody>{children}</S.ModalBody>
        <S.ModalFooter>
          <S.CancelButton isDelete={isDelete} onClick={isDelete ? onDelete : onClose}>
            {cancelText}
          </S.CancelButton>
          <S.ConfirmButton onClick={onConfirm}>{confirmText}</S.ConfirmButton>
        </S.ModalFooter>
      </S.ModalWrapper>
    </S.ModalOverlay>
  </ModalPortal>
);

export default Modal;
