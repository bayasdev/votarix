'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import Button from '../ui/Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal ${showModal ? 'modal-open' : undefined}`}>
      <div className="modal-box">
        {/* header */}
        <div className="mb-4 flex items-center justify-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            className="btn-ghost btn-sm btn-circle btn absolute right-2"
            onClick={handleClose}
          >
            <IoMdClose size={18} />
          </button>
        </div>
        {/*body*/}
        <div className="py-4">{body}</div>
        {/*footer*/}
        <div className="flex flex-col gap-2 py-4">
          <div className="flex flex-row items-center gap-4">
            {secondaryAction && secondaryActionLabel && (
              <Button
                disabled={disabled}
                label={secondaryActionLabel}
                onClick={handleSecondaryAction}
                outline
              />
            )}
            <Button
              disabled={disabled}
              label={actionLabel}
              onClick={handleSubmit}
            />
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;
