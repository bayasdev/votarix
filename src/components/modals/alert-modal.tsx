'use client';

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';

interface AlertModalProps {
  title?: string;
  description?: string;
  confirmText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  title = '¿Estás seguro?',
  description = 'Esta acción no se puede deshacer.',
  confirmText = 'Eliminar',
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
